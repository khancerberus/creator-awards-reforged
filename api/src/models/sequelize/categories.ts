import {
    Association,
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import { sequelize } from '../../config/sequelize';
import { NominationModel } from './nominations';

export class CategoryModel extends Model<
    InferAttributes<CategoryModel, { omit: 'nominations' }>,
    InferCreationAttributes<CategoryModel, { omit: 'nominations' }>
> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare description: string;
    declare maxVotes: number;

    declare nominations?: NonAttribute<NominationModel[]>;

    declare static associations: {
        nominations: Association<CategoryModel, NominationModel>;
    };

    static getById = async ({ id }: { id: number }): Promise<CategoryModel | null> => {
        return CategoryModel.findByPk(id);
    };

    static getNominations = async (): Promise<CategoryModel[]> => {
        return CategoryModel.findAll({
            include: {
                model: NominationModel,
                as: 'nominations',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'categoryId'],
                },
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
            },
        });
    };
}

CategoryModel.init(
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
        maxVotes: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: 'CATEGORIES',
    },
);
