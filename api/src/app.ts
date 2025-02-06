import express, { Router } from 'express';
import http from 'node:http';
import { config, middlewares, logger } from './config';
import { createAuthRouter } from './routers/auth';
import { CreateServerProps } from './typings/configs';
import { createTwitchUsersRouter } from './routers/twitchUsers';
import { createClient } from 'redis';
import session from 'express-session';
import { RedisStore } from 'connect-redis';
import { createTicketRouter } from './routers/tickets';
import { Tickets } from './models/sequelize/tickets';

export const redisClient = createClient({
    url: config().redisUrl,
});

let tries = 0;
const maxTries = 5;

export const createServer = async ({ twitchUserModel }: CreateServerProps) => {
    const app = express();

    redisClient.on('error', (error) => {
        logger.error(error);
    });

    await redisClient.connect();

    const redisStore = new RedisStore({
        client: redisClient,
        prefix: 'session:',
    });

    app.use(
        session({
            store: redisStore,
            resave: false,
            saveUninitialized: false,
            secret: config().sessionSecret,
            cookie: {
                secure: config().isProduction,
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
                sameSite: 'strict',
            },
        }),
    );

    //region Middlewares
    app.use(middlewares.cors());
    app.get('/ticket/:id', async (req, res, next) => {
        try {
            const ticketId = Number(req.params.id);
            if (!ticketId) {
                res.status(404).json({ message: 'Ticket not found' });
                return;
            }

            const ticket = await Tickets.getById({ id: ticketId });
            if (!ticket) {
                res.status(404).json({ message: 'Ticket not found' });
                return;
            }

            res.send(`
                <html>
                    <head>
                        <meta property="og:title" content="Creator Awards Ticket" />
                        <meta property="og:description" content="Este es tu ticket para los Creator Awards" />
                        <meta property="og:image" content="${ticket.imageUrl}" />
                        <meta property="og:url" content="https://awards.cotecreator.com" />
                        <meta property="og:type" content="website" />

                        <!-- Twitter Card Meta Tags -->
                        <meta name="twitter:card" content="summary_large_image" />
                        <meta name="twitter:title" content="Creator Awards Ticket" />
                        <meta name="twitter:description" content="Este es tu ticket para los Creator Awards" />
                        <meta name="twitter:image" content="${ticket.imageUrl}" />
                        <meta name="twitter:url" content="https://awards.cotecreator.com" />

                        <title>Creator Awards</title>
                    </head>
                    <body>
                        <script>
                            window.location.href = "https://awards.cotecreator.com";
                        </script>
                    </body>
                </html>`);
        } catch (error) {
            next(error);
        }
    });

    app.use(middlewares.json());
    app.use(middlewares.httpLogger());
    app.use(
        middlewares.isAuthenticated({
            bypass: ['/api/v1/auth/open-session'],
        }),
    );

    //region Routes
    const baseRouter = Router();
    baseRouter.use('/auth', createAuthRouter({ twitchUserModel }));
    baseRouter.use('/users', createTwitchUsersRouter({ twitchUserModel }));
    baseRouter.use('/tickets', createTicketRouter({ twitchUserModel }));
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
