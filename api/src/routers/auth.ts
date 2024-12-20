import { Router } from 'express';
import { TwitchUserModel } from '../models/sequelize/TwitchUser'
import { AuthController } from '../controllers/auth'

export const createAuthRouter = ({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }) => {
    const router = Router();
    const controller = new AuthController({ twitchUserModel });

    router.post('/token', controller.getToken);

    return router;
};
