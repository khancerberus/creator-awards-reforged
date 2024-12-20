import { createServer } from './app';
import { TwitchUserModel } from './models/sequelize/TwitchUser';

createServer({
    twitchUserModel: TwitchUserModel,
});
