import { RequestHandler } from 'express';
import { Tickets } from '../models/sequelize/tickets';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';
import { TwitchAPIService } from '../services/twitch.api';
import { supabase } from '../config/supabaseS3';
import { logger } from '../config';

export class TicketController {
    declare ticketModel: typeof Tickets;
    declare twitchUserModel: typeof TwitchUserModel;

    constructor({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }) {
        this.ticketModel = Tickets;
        this.twitchUserModel = twitchUserModel;
    }

    generate: RequestHandler = async (req, res, next) => {
        try {
            const twitchAccessToken = req.session.twitchAccessToken;
            if (!twitchAccessToken) {
                res.status(404).json({ message: 'Access Token not found' });
                return;
            }
            const userID = req.session.userID;
            if (!userID) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const twitchUser = await this.twitchUserModel.getByPublicId({ publicId: userID });
            if (!twitchUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const subStatus = await TwitchAPIService.getSubStatus({
                token: twitchAccessToken,
                userId: twitchUser.twitchId,
            });

            const newTicket = await this.ticketModel.generate(subStatus);

            twitchUser.ticketId = newTicket.id;
            await twitchUser.save();

            res.json({
                ticket: newTicket,
            });
        } catch (error) {
            next(error);
        }
    };

    saveImage: RequestHandler = async (req, res, next) => {
        try {
            const userID = req.session.userID;
            if (!userID) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const twitchUser = await this.twitchUserModel.getByPublicId({ publicId: userID });
            if (!twitchUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const ticket = await this.ticketModel.getById({ id: twitchUser.ticketId });
            if (!ticket) {
                res.status(404).json({ message: 'Ticket not found' });
                return;
            }

            const image = req.file?.buffer;
            const contentType = req.file?.mimetype;
            if (!image || !contentType) {
                res.status(404).json({ message: 'Image not found' });
                return;
            }

            const fileName = `ticket-${ticket.id}.jpg`;
            const { error } = await supabase.storage.from('tickets').upload(fileName, image, {
                cacheControl: '3600',
                upsert: true,
                contentType,
            });
            if (error) {
                logger.error(error);
                res.status(500).json({ message: 'Error uploading image' });
                return;
            }

            const {
                data: { publicUrl },
            } = supabase.storage.from('tickets').getPublicUrl(fileName);

            ticket.imageUrl = publicUrl;
            await ticket.save();

            res.json({
                imageUrl: publicUrl,
            });
        } catch (error) {
            next(error);
        }
    };

    updateSub: RequestHandler = async (req, res, next) => {
        try {
            const twitchAccessToken = req.session.twitchAccessToken;
            if (!twitchAccessToken) {
                res.status(404).json({ message: 'Access Token not found' });
                return;
            }
            const userID = req.session.userID;
            if (!userID) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const twitchUser = await this.twitchUserModel.getByPublicId({ publicId: userID });
            if (!twitchUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            const ticket = await this.ticketModel.getById({ id: twitchUser.ticketId });
            if (!ticket) {
                res.status(404).json({ message: 'Ticket not found' });
                return;
            }

            const subStatus = await TwitchAPIService.getSubStatus({
                token: twitchAccessToken,
                userId: twitchUser.twitchId,
            });

            ticket.isSub = subStatus.isSub;
            ticket.isGift = subStatus.isGift;
            ticket.tier = subStatus.tier;
            await ticket.save();

            res.status(200).json({ ticket });
        } catch (error) {
            next(error);
        }
    };

    shareTicket: RequestHandler = async (req, res, next) => {
        try {
            const ticketId = Number(req.params.id);
            if (!ticketId) {
                res.status(404).json({ message: 'Ticket not found' });
                return;
            }

            const ticket = await this.ticketModel.getById({ id: ticketId });
            if (!ticket) {
                res.status(404).json({ message: 'Ticket not found' });
                return;
            }

            res.send(`
                <html>
                    <head>
                        <meta property="og:title" content="Creator Awards" />
                        <meta property="og:description" content="Creator Awards - Premiación por y para creators de la comunidad" />
                        <meta property="og:image" content="${ticket.imageUrl}" />
                        <meta property="og:url" content="https://awards.cotecreator.com" />
                        <meta property="og:type" content="website" />

                        <!-- Twitter Meta Tags -->
                        <meta name="twitter:card" content="summary_large_image">
                        <meta property="twitter:domain" content="awards.cotecreator.com">
                        <meta property="twitter:url" content="https://awards.cotecreator.com/api/v1/tickets/${ticket.id}">
                        <meta name="twitter:title" content="Creator Awards">
                        <meta name="twitter:description" content="Creator Awards - Premiación por y para creators de la comunidad">
                        <meta name="twitter:image" content="${ticket.imageUrl}"

                        <title>Creator Awards</title>
                    </head>
                    <body>
                        <script>
                            window.location.href = 'https://awards.cotecreator.com';
                        </script>
                    </body>
                </html>
            `);
        } catch (error) {
            next(error);
        }
    };
}
