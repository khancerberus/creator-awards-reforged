import corsConfig from 'cors';
import express, { RequestHandler } from 'express';

import { config } from './system';
import { logger } from './logger';

const json = express.json();

const cors = corsConfig({
    origin: config.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

const httpLogger: RequestHandler = (req, res, next) => {
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

export const middlewares = {
    json,
    cors,
    httpLogger,
};
