import { CreationOptional, DataTypes, Model } from 'sequelize';
import { CreateTwitchUserType, TwitchUserType, UpdateTwitchUserType } from '../../typings/twitchUsers';
import { sequelize } from '../../config/sequelize';
import { Tickets } from './tickets'

export class TwitchUserModel extends Model implements TwitchUserType {
    declare id: CreationOptional<string>;
    declare publicId: CreationOptional<string>;
    declare twitchId: string;
    declare email: string;
    declare displayName: string;
    declare profileImageUrl: string;
    declare ticketId: CreationOptional<number>;

    static getById = async ({ id }: { id: string }): Promise<TwitchUserModel | null> => {
        return TwitchUserModel.findByPk(id);
    };

    static getByPublicId = async ({ publicId }: { publicId: string }): Promise<TwitchUserModel | null> => {
        return TwitchUserModel.findOne({ where: { publicId } });
    };

    static getByTwitchId = async ({ twitchId }: { twitchId: string }): Promise<TwitchUserModel | null> => {
        return TwitchUserModel.findOne({ where: { twitchId } });
    };

    static getAll = async (): Promise<TwitchUserModel[]> => {
        return TwitchUserModel.findAll();
    };

    static add = async (newTwitchUser: CreateTwitchUserType): Promise<TwitchUserModel | null> => {
        return TwitchUserModel.create(newTwitchUser);
    };

    static edit = async ({
        id,
        toUpdate,
    }: {
        id: string;
        toUpdate: UpdateTwitchUserType;
    }): Promise<TwitchUserModel | null> => {
        const [rowsAffected] = await TwitchUserModel.update(toUpdate, { where: { id } });
        if (rowsAffected === 0) {
            return null;
        } else {
            return TwitchUserModel.findByPk(id);
        }
    };

    static remove = async ({ id }: { id: string }): Promise<number> => {
        return TwitchUserModel.destroy({ where: { id } });
    };
}

TwitchUserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        publicId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        twitchId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profileImageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'TWITCH_USERS',
        timestamps: true,
    },
);

TwitchUserModel.belongsTo(Tickets, { foreignKey: 'ticketId' });
