import corsConfig from 'cors';
import express, { ErrorRequestHandler, RequestHandler } from 'express';

import { logger } from './logger';
import { config } from './system';
import axios from 'axios';

const json = () => express.json();

const cors = () =>
    corsConfig({
        origin: config().origin,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

const httpLogger = (): RequestHandler => (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = `${req.method} ${req.url} ${res.statusCode} - ${duration}ms`;
        if (res.statusCode >= 500) {
            logger.error(log);
        } else if (res.statusCode >= 400 && res.statusCode < 500) {
            logger.warn(log);
        } else if (res.statusCode >= 200 && res.statusCode < 400) {
            logger.info(log);
        } else {
            logger.debug(log);
        }
    });
    next();
};

const notFoundHandler = (): RequestHandler => (_req, res) => {
    res.status(404).json({ error: 'Not Found' });
};

const errorHandler = (): ErrorRequestHandler => (error, _req, res, next) => {
    logger.error(error);
    if (res.headersSent) {
        return next(error);
    }
    if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json({
            message: error.response?.data?.message || 'Twitch API is unreachable',
        });
        return;
    }
    res.status(500).json({ error: 'Internal Server Error' });
};

export const middlewares = {
    json,
    cors,
    httpLogger,
    errorHandler,
    notFoundHandler,
};
