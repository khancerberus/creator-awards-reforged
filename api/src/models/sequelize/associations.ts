import { CategoryModel } from './categories';
import { NominationModel } from './nominations';
import { TicketModel } from './tickets';
import { TwitchUserModel } from './twitchUsers';
import { VoteModel } from './votes';

TwitchUserModel.belongsTo(TicketModel, { foreignKey: 'ticketId', as: 'ticket' });

CategoryModel.hasMany(NominationModel, {
    sourceKey: 'id',
    foreignKey: 'categoryId',
    as: 'nominations',
});

NominationModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId',
    as: 'category',
});

VoteModel.belongsTo(TwitchUserModel, {
    foreignKey: 'userId',
    as: 'user',
});

VoteModel.belongsTo(CategoryModel, {
    foreignKey: 'categoryId',
    as: 'category',
});

VoteModel.belongsTo(NominationModel, {
    foreignKey: 'nominationId',
    as: 'nomination',
});
