import { Sequelize } from 'sequelize';
import { config } from './system';
import { logger } from './logger';

export const sequelize = new Sequelize(config().dbUri, {
    logging: config().isProduction ? false : logger.debug.bind(logger),
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
