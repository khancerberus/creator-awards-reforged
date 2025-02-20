import { RequestHandler } from 'express';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';

export class TwitchUsersController {
    declare twitchUserModel: typeof TwitchUserModel;

    constructor({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }) {
        this.twitchUserModel = twitchUserModel;
    }

    getById: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;

            const user = await this.twitchUserModel.getById({ id });

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json(user);
        } catch (error) {
            next(error);
        }
    };

    getAll: RequestHandler = async (_req, res, next) => {
        try {
            const users = await this.twitchUserModel.getAll();

            res.json(users);
        } catch (error) {
            next(error);
        }
    };

    add: RequestHandler = async (req, res, next) => {
        try {
            const user = req.body;

            const newUser = await this.twitchUserModel.add(user);

            res.json(newUser);
        } catch (error) {
            next(error);
        }
    };

    edit: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const toUpdate = req.body;

            const updatedUser = await this.twitchUserModel.edit({ id: Number(id), toUpdate });
            if (!updatedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json(updatedUser);
        } catch (error) {
            next(error);
        }
    };

    remove: RequestHandler = async (req, res, next) => {
        try {
            const { id } = req.params;
            const removed = await this.twitchUserModel.remove({ id: Number(id) });

            if (removed === 0) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.status(204).json();
        } catch (error) {
            next(error);
        }
    };
}
