import { Router } from 'express';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';
import { TicketController } from '../controllers/tickets';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const createTicketRouter = ({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }) => {
    const router = Router();
    const controller = new TicketController({ twitchUserModel });

    router.post('/generate', controller.generate);
    router.post('/save-image', upload.single('image'), controller.saveImage);
    router.get('/:id', controller.shareTicket);
    router.put('/update-sub', controller.updateSub);

    return router;
};
