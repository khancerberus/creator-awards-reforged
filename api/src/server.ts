import { createServer } from './app';
import { TwitchUserModel } from './models/sequelize/twitchUsers';

createServer({
    twitchUserModel: TwitchUserModel,
});
