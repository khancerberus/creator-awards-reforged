import { createServer } from './app';
import { TwitchUserModel } from './models/sequelize/twitchUsers';

declare module 'express-session' {
    interface SessionData {
        userID: string;
        twitchAccessToken: string;
    }
}

createServer({
    twitchUserModel: TwitchUserModel,
});
