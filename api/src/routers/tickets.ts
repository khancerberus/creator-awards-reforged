import { Router } from 'express'
import { TwitchUserModel } from '../models/sequelize/twitchUsers'
import { TicketController } from '../controllers/tickets'

export const createTicketRouter = ({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }) => {
    const router = Router();
    const controller = new TicketController({ twitchUserModel });

    router.post('/generate', controller.generate);
    router.post('/save-image', controller.saveImage);

    return router;
}