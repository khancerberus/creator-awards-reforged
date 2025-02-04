import { TwitchUserModel } from '../models/sequelize/twitchUsers';

export interface CreateServerProps {
    twitchUserModel: typeof TwitchUserModel;
}
