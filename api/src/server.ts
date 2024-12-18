import http from 'node:http';

import application from './app';
import { config, logger } from './config';

let tries = 0;
const maxTries = 5;

const server = http.createServer(application);
server.listen(config.port, () => {
    logger.info(`Server is running on http://localhost:${config.port}`);
});

server.on('error', (error: any) => {
    if (error?.code === 'EADDRINUSE') {
        logger.error('Address in use, retrying...' + tries + '/' + maxTries);
        setTimeout(() => {
            server.close();
            server.listen(config.port);

            if (tries >= maxTries) {
                logger.error('Max retries reached, exiting...');
                process.exit(1);
            }

            tries++;
        }, 5000);
    }
});
