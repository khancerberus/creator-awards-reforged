import { logger } from './logger';
import { sequelize } from './sequelize';
import '../models/sequelize/tickets';
import '../models/sequelize/twitchUsers';
import '../models/sequelize/categories';
import '../models/sequelize/nominations';
import '../models/sequelize/votes';
import '../models/sequelize/associations';

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
})();
