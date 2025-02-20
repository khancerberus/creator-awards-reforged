import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { sequelize } from '../../config/sequelize';

export class TwitchUserModel extends Model<InferAttributes<TwitchUserModel>, InferCreationAttributes<TwitchUserModel>> {
    declare id: CreationOptional<number>;
    declare publicId: CreationOptional<string>;
    declare twitchId: string;
    declare email: string;
    declare displayName: string;
    declare profileImageUrl: string;
    declare ticketId: CreationOptional<number>;
    declare hasVoted: boolean;
    declare timestampVoted: number;

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

    static add = async (newTwitchUser: any): Promise<TwitchUserModel | null> => {
        return TwitchUserModel.create(newTwitchUser);
    };

    static edit = async ({ id, toUpdate }: { id: number; toUpdate: any }): Promise<TwitchUserModel | null> => {
        const [rowsAffected] = await TwitchUserModel.update(toUpdate, { where: { id } });
        if (rowsAffected === 0) {
            return null;
        } else {
            return TwitchUserModel.findByPk(id);
        }
    };

    static remove = async ({ id }: { id: number }): Promise<number> => {
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
        hasVoted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        timestampVoted: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: Date.now(),
        },
    },
    {
        sequelize,
        tableName: 'TWITCH_USERS',
        timestamps: true,
    },
);
