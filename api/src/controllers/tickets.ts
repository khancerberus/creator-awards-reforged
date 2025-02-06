import { RequestHandler } from 'express';
import { Tickets } from '../models/sequelize/tickets';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';
import { TwitchAPIService } from '../services/twitch.api'
import { supabase } from '../config/supabaseS3'

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

            const image = req.body.image;
            if (!image) {
                res.status(404).json({ message: 'Image not found' });
                return;
            }

            const fileName = `ticket-${ticket.id}.png`;
            const { data, error } = await supabase.storage.from('tickets').upload(fileName, image);

            
            if (error) {
                res.status(500).json({ message: 'Error uploading image' });
                return;
            }
            console.log(data)

            const { data: { publicUrl } } = supabase.storage.from('tickets').getPublicUrl(fileName);

            ticket.imageUrl = publicUrl
            await ticket.save()

            res.json({
                imageUrl: publicUrl
            });
        } catch (error) {
            next(error);
        }
    }
}
