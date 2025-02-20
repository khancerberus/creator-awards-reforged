import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export class VoteModel extends Model<InferAttributes<VoteModel>, InferCreationAttributes<VoteModel>> {
    declare id: CreationOptional<number>;
    declare userId: number;
    declare categoryId: number;
    declare nominationId: number;
}

VoteModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        categoryId: {
            type: DataTypes.INTEGER,
        },
        nominationId: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: 'VOTES',
    },
);
