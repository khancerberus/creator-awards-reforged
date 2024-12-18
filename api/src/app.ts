import express, { Router } from 'express';
import { config, middlewares } from './config';
import { AuthController } from './controllers/auth.controller';
import { authRouter } from './routers/auth.router';
import { AuthService } from './services/auth.services'

const app = express();
const baseRouter = Router();
app.use(config.basePath, baseRouter);

//region Middlewares
app.use(middlewares.json);
app.use(middlewares.cors);
app.use(middlewares.httpLogger);

//region Routes
const service = new AuthService();

const authController = new AuthController({
    service
});

baseRouter.use(authRouter({ controller: authController }));

//region Error Handlers
// TODO: Add error handlers

export default app;
