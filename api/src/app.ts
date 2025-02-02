import express, { Router } from 'express';
import http from 'node:http';
import { config, middlewares, logger } from './config';
import { createAuthRouter } from './routers/auth';
import { CreateServerProps } from './typings/configs';
import { createTwitchUsersRouter } from './routers/twitchUsers';

let tries = 0;
const maxTries = 5;

export const createServer = ({ twitchUserModel }: CreateServerProps) => {
    const app = express();

    //region Middlewares
    app.use(middlewares.cors());
    app.use(middlewares.json());
    app.use(middlewares.httpLogger());

    //region Routes
    const baseRouter = Router();
    baseRouter.use('/auth', createAuthRouter({ twitchUserModel }));
    baseRouter.use('/users', createTwitchUsersRouter({ twitchUserModel }));
    app.use(config().basePath, baseRouter);

    //region Error Handlers
    app.use(middlewares.errorHandler());
    app.use(middlewares.notFoundHandler());

    //region Server creation
    const server = http.createServer(app);
    server.listen(config().port, () => {
        logger.info(`Server is running on http://localhost:${config().port}`);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
            logger.error('Address in use, retrying...' + tries + '/' + maxTries);
            setTimeout(() => {
                server.close();
                server.listen(config().port);

                if (tries >= maxTries) {
                    logger.error('Max retries reached, exiting...');
                    process.exit(1);
                }

                tries++;
            }, 5000);
        }
    });
};
