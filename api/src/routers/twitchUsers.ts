import { Router } from 'express';
import { TwitchUsersController } from '../controllers/twitchUsers';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';

export const createTwitchUsersRouter = ({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }) => {
    const router = Router();
    const controller = new TwitchUsersController({ twitchUserModel });

    router.get('/:id', controller.getById);
    router.get('/', controller.getAll);
    router.post('/', controller.add);
    router.put('/:id', controller.edit);
    router.delete('/:id', controller.remove);

    return router;
};
