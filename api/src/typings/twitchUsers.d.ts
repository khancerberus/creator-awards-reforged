export interface TwitchUserType {
    id: string;
    publicId: string;
    twitchId: string;
    email: string;
    displayName: string;
    profileImageUrl: string;
}

export type CreateTwitchUserType = Omit<TwitchUserType, 'id' | 'publicId'>;
export type UpdateTwitchUserType = Partial<CreateTwitchUserType>;

export type ForTokenTwitchUserType = Omit<TwitchUserType, 'twitchId' | 'email'>;
