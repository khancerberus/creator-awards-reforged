import { RequestHandler } from 'express';
import { TwitchUserModel } from '../models/sequelize/twitchUsers';
import { CategoryModel } from '../models/sequelize/categories';
import { VoteModel } from '../models/sequelize/votes';
import { logger } from '../config';

export class VoteSystemController {
    declare twitchUserModel: typeof TwitchUserModel;

    constructor({ twitchUserModel }: { twitchUserModel: typeof TwitchUserModel }) {
        this.twitchUserModel = twitchUserModel;
    }

    getNominations: RequestHandler = async (req, res, next) => {
        try {
            const categories = await CategoryModel.getNominations();

            res.json(categories);
        } catch (error) {
            next(error);
        }
    };

    vote: RequestHandler = async (req, res, next) => {
        try {
            const userId = req.session.userID;
            if (!userId) {
                res.status(401).json({ message: 'Tu sesión es incorrecta! No hagas trampa 🤨' });
                return;
            }

            const user = await this.twitchUserModel.getByPublicId({ publicId: userId });
            if (!user) {
                res.status(404).json({
                    message: 'No hemos encontrado tu usuario, estás seguro que tienes tu sesión correcta?',
                });
                return;
            }

            if (user.hasVoted) {
                res.status(400).json({ message: 'Ya has votado! es solo 1 voto por persona 🤨' });
                return;
            }

            const categories = req.body;
            if (!categories || !Array.isArray(categories)) {
                res.status(400).json({
                    message: 'Error en la petición',
                    details: 'categories is empty or is not array',
                });
                return;
            }

            const votes = [];
            for (const category of categories) {
                const { id: categoryId, votedNominations } = category;
                if (!categoryId) {
                    res.status(400).json({ message: 'Error en la petición', details: 'categoryId is empty' });
                    return;
                }
                if (!votedNominations || !Array.isArray(votedNominations)) {
                    res.status(400).json({
                        message: 'Error en la petición',
                        details: 'votedNominations is empty or is not array',
                    });
                    return;
                }

                const realCategory = await CategoryModel.getById({ id: categoryId });
                if (!realCategory) {
                    res.status(404).json({ message: 'Error en la petición', details: 'real category not found' });
                    return;
                }

                if (realCategory.maxVotes < votedNominations.length) {
                    res.status(400).json({ message: 'Error en la petición', details: 'Too many votes' });
                    return;
                }

                for (const nominationId of votedNominations) {
                    votes.push({
                        userId: user.id,
                        categoryId,
                        nominationId,
                    });
                }
            }

            const userVotes = await VoteModel.bulkCreate(votes);
            if (!userVotes) {
                res.status(500).json({ message: 'Error al subir los votos', details: 'userVotes is empty' });
                return;
            }

            user.hasVoted = true;
            await user.save();

            logger.info(userVotes);

            res.json('🎉 Votos subidos!');
        } catch (error) {
            next(error);
        }
    };
}
