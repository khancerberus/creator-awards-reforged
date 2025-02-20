import { Router } from 'express';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';
import { VoteSystemController } from '../controllers/voteSystem';

export const createVoteSystemRouter = ({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }): Router => {
    const router = Router();
    const controller = new VoteSystemController({ twitchUserModel });

    router.get('/nominations', controller.getNominations);
    router.post('/vote', controller.vote);

    return router;
};
