import { RequestHandler } from 'express';
import { TwitchUserModel } from '../models/sequelize/TwitchUser';
import { TwitchAPIService } from '../services/twitch.api';
import { generateJWT } from '../utils/jwt';

interface AuthControllerProps {
    twitchUserModel: typeof TwitchUserModel;
}

export class AuthController {
    declare twitchUserModel: typeof TwitchUserModel;

    constructor({ twitchUserModel }: AuthControllerProps) {
        this.twitchUserModel = twitchUserModel;
    }

    getToken: RequestHandler = async (req, res, next) => {
        try {
            // 1. Get the Twitch code from the request body
            const { code } = req.body;
            if (!code) {
                res.status(400).json({ message: 'Missing code' });
                return;
            }

            // 2. Use the Twitch code to get the user's Twitch ID
            const token = await TwitchAPIService.getToken({ code });
            const twitchUserData = await TwitchAPIService.getUser({
                token: token.access_token,
                twitchId: token.user_id,
            });
            if (!twitchUserData) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            // 3. Use the Twitch ID to get the user's from the database (if it exists, create it otherwise)
            const twitchUser = await this.twitchUserModel.getByTwitchId(twitchUserData);
            if (twitchUser) {
                const updatedTwitchUser = await this.twitchUserModel.edit({
                    id: twitchUser.id,
                    toUpdate: twitchUserData,
                });
                if (!updatedTwitchUser) {
                    // 4.1. Generate a JWT token with the public ID and return it
                    const jwt = generateJWT({ payload: { sub: twitchUser.publicId } });
                    res.status(200).json({ token: jwt });
                    return;
                }

                // 4.2. Generate a JWT token with the public ID and return it
                const jwt = generateJWT({ payload: { sub: updatedTwitchUser.publicId } });
                res.status(200).json({ token: jwt });
            }

            const newTwitchUser = await this.twitchUserModel.add(twitchUserData);
            if (!newTwitchUser) {
                res.status(500).json({ message: 'Failed to create user' });
                return;
            }

            // 4.3. Generate a JWT token with the public ID and return it
            const jwt = generateJWT({ payload: { sub: newTwitchUser.publicId } });
            res.status(201).json({ token: jwt });
        } catch (error) {
            next(error);
        }
    };
}

export interface AuthRouterParams {
    controller: AuthController;
}
