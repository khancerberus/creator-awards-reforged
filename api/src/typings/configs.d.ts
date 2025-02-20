import { TwitchUserModel } from '../models/sequelize/twitchUsers';

export interface CreateServerProps {
    twitchUserModel: typeof TwitchUserModel;
}

declare module 'express-session' {
    interface SessionData {
        userID: string;
        twitchAccessToken: string;
    }
}
