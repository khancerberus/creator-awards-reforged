import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export class TicketModel extends Model<InferAttributes<TicketModel>, InferCreationAttributes<TicketModel>> {
    declare id: CreationOptional<number>;
    declare imageUrl: CreationOptional<string>;
    declare isSub: boolean;
    declare isGift: boolean;
    declare tier: number;

    static getById = async ({ id }: { id: number }): Promise<TicketModel | null> => {
        return TicketModel.findByPk(id);
    };

    static generate = async ({
        isSub,
        isGift,
        tier,
    }: {
        isSub: boolean;
        isGift: boolean;
        tier: number;
    }): Promise<TicketModel> => {
        return TicketModel.create({ isSub, isGift, tier });
    };
}

TicketModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        imageUrl: {
            type: DataTypes.STRING,
        },
        isSub: {
            type: DataTypes.BOOLEAN,
        },
        isGift: {
            type: DataTypes.BOOLEAN,
        },
        tier: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        tableName: 'TICKETS',
    },
);
