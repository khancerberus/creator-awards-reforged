import { DataTypes, Model } from 'sequelize';
import { TicketsType } from '../../typings/tickets';
import { sequelize } from '../../config/sequelize';

export class Tickets extends Model implements TicketsType {
    declare id: number;
    declare imageUrl: string;
    declare isSub: boolean;
    declare isGift: boolean;
    declare tier: number;
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
