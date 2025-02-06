import { DataTypes, Model } from 'sequelize';
import { TicketsType } from '../../typings/tickets';
import { sequelize } from '../../config/sequelize';

export class Tickets extends Model implements TicketsType {
    declare id: number;
    declare imageUrl: string;
    declare isSub: boolean;
    declare isGift: boolean;
    declare tier: number;

    static getById = async ({ id }: { id: number }): Promise<Tickets | null> => {
        return Tickets.findByPk(id);
    };

    static generate = async ({
        isSub,
        isGift,
        tier,
    }: {
        isSub: boolean;
        isGift: boolean;
        tier: number;
    }): Promise<Tickets> => {
        return Tickets.create({ isSub, isGift, tier });
    };
}

Tickets.init(
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
