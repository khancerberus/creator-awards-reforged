import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export class NominationModel extends Model<InferAttributes<NominationModel>, InferCreationAttributes<NominationModel>> {
    declare id: number;
    declare title: string;
    declare description: string;
    declare type: number;
    declare preview: string;
    declare src: string;
    declare categoryId: number;
}

NominationModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
        type: {
            type: DataTypes.INTEGER,
        },
        preview: {
            type: DataTypes.STRING,
        },
        src: {
            type: DataTypes.STRING,
        },
        categoryId: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: 'NOMINATIONS',
    },
);

