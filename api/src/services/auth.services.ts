import EventEmitter from 'node:events'
import { logger } from '../config'

export class AuthService extends EventEmitter {
    declare clients: any[];

    constructor() {
        super();
        this.clients = [];

        this.once('client-added', (client) => {
            logger.info(`Client added: ${client.id}`);
        });
        
        this.once('client-removed', (client) => {
            logger.info(`Client removed: ${client.id}`);
        });
    }

    addClient(client: any) {
        logger.info(`Client added: ${client.id}`);
        this.clients.push(client);
        this.emit('client-added', client);
    }

    removeClient(client: any) {
        logger.info(`Client removed: ${client.id}`);
        this.clients = this.clients.filter(c => c.id !== client.id);
        this.emit('client-removed', client);
    }

    getAllClients() {
        return this.clients;
    }
}

export interface AuthControllerParams {
    service: AuthService;
}