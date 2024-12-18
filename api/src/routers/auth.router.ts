import { Router } from 'express';
import type { AuthRouterParams } from '../controllers/auth.controller'

export const authRouter = ({ controller }: AuthRouterParams) => {
    const router = Router();

    router.post('/auth/token', async (req, res) => controller.getToken(req, res));
    router.delete('/auth/token', async (req, res) => controller.revokeToken(req, res));

    return router;
};
