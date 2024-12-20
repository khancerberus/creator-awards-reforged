import { Sequelize } from 'sequelize';
import { config } from './system';
import { logger } from './logger';

export const sequelize = new Sequelize(config().dbUri, {
    logging: logger.debug.bind(logger),
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
})();
