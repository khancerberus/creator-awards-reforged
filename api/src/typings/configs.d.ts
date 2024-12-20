import { TwitchUserModel } from '../models/sequelize/TwitchUser'

export interface CreateServerProps {
    twitchUserModel: typeof TwitchUserModel
}