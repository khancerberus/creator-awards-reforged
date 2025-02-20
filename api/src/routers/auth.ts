import { Router } from 'express';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';
import { AuthController } from '../controllers/auth';

export const createAuthRouter = ({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }) => {
    const router = Router();
    const controller = new AuthController({ twitchUserModel });

    router.post('/open-session', controller.openSession);
    router.get('/close-session', controller.closeSession);
    router.get('/user', controller.getSessionUser);

    return router;
};
