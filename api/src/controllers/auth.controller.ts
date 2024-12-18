import { Request, Response } from 'express';
import type { AuthControllerParams, AuthService } from '../services/auth.services';
import { logger } from '../config'

export class AuthController {
    declare service: AuthService;

    constructor({ service }: AuthControllerParams) {
        this.service = service;
        this.getToken = this.getToken.bind(this);
        this.revokeToken = this.revokeToken.bind(this);
    }

    async getToken(_req: Request, res: Response): Promise<void> {
        this.service.addClient({ id: '1' });
        logger.info(this.service.getAllClients());
        res.json({ token: 'token' });
    }
    
    async revokeToken(_req: Request, res: Response): Promise<void> {
        this.service.removeClient({ id: '1' });
        logger.info(this.service.getAllClients());
        res.json({ revoked: true });
    }
}

export interface AuthRouterParams {
    controller: AuthController;
}
