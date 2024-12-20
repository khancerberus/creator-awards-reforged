import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateJWT = ({ payload }: { payload: any }) => {
    return jwt.sign(payload, config().jwtSecret, {
        expiresIn: '24h',
    });
};
