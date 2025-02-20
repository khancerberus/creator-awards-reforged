import { RequestHandler } from 'express';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';
import { TwitchAPIService } from '../services/twitch.api';
import { TicketModel } from '../models/sequelize/tickets';

interface AuthControllerProps {
    twitchUserModel: typeof TwitchUserModel;
}

export class AuthController {
    declare twitchUserModel: typeof TwitchUserModel;
    declare ticketModel: typeof TicketModel;

    constructor({ twitchUserModel }: AuthControllerProps) {
        this.twitchUserModel = twitchUserModel;
        this.ticketModel = TicketModel;
    }

    openSession: RequestHandler = async (req, res, next) => {
        try {
            // 1. Get the Twitch code from the request body
            const { code } = req.body;
            if (!code) {
                res.status(400).json({ message: 'Missing code' });
                return;
            }

            // 2. Use the Twitch code to get the user's Twitch ID
            const tokenData = await TwitchAPIService.getToken({ code });
            const twitchUserData = await TwitchAPIService.getUser({
                token: tokenData.access_token,
                twitchId: tokenData.user_id,
            });
            if (!twitchUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // 3. Use the Twitch ID to get the user's from the database (if it exists, create it otherwise)
            let twitchUser = await this.twitchUserModel.getByTwitchId(twitchUserData);
            if (!twitchUser) {
                twitchUser = await this.twitchUserModel.add(twitchUserData);
                if (!twitchUser) {
                    res.status(500).json({ message: 'Failed to create user' });
                    return;
                }
            } else {
                twitchUser = await this.twitchUserModel.edit({
                    id: twitchUser.id,
                    toUpdate: twitchUserData,
                });
                if (!twitchUser) {
                    res.status(500).json({ message: 'Failed to update user' });
                    return;
                }
            }

            const ticket = await this.ticketModel.getById({ id: twitchUser.ticketId });

            req.session.regenerate((err) => {
                if (err) return next(err);

                req.session.userID = twitchUser.publicId;
                req.session.twitchAccessToken = tokenData.access_token;

                req.session.save((err) => {
                    if (err) return next(err);

                    return res.status(201).json({
                        user: {
                            publicId: twitchUser.publicId,
                            displayName: twitchUser.displayName,
                            profileImageUrl: twitchUser.profileImageUrl,
                            ticket,
                            hasVoted: twitchUser.hasVoted,
                        },
                    });
                });
            });
        } catch (error) {
            next(error);
        }
    };

    closeSession: RequestHandler = async (req, res, next) => {
        try {
            req.session.destroy((err) => {
                if (err) return next(err);

                res.clearCookie('connect.sid', {
                    path: '/',
                });

                return res.status(200).json({ message: 'Session closed' });
            });
        } catch (error) {
            next(error);
        }
    };

    getSessionUser: RequestHandler = async (req, res, next) => {
        try {
            const userID = req.session.userID;
            if (!userID) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const user = await this.twitchUserModel.getByPublicId({ publicId: userID });
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const ticket = await this.ticketModel.getById({ id: user.ticketId });

            res.status(200).json({
                user: {
                    publicId: user.publicId,
                    displayName: user.displayName,
                    profileImageUrl: user.profileImageUrl,
                    ticket,
                    hasVoted: user.hasVoted,
                },
            });
        } catch (error) {
            next(error);
        }
    };
}

export interface AuthRouterParams {
    controller: AuthController;
}
