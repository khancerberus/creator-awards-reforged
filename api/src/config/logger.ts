import pino from 'pino';

export const logger = pino({
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
            minimumLevel: 'debug',
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss Z',
        },
    },
});
