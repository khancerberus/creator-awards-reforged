import axios from 'axios';
import { config } from '../config';

const getToken = async ({ code }: { code: string }) => {
    const response = await axios.post(
        'https://id.twitch.tv/oauth2/token',
        {
            client_id: config().twitchClientId,
            client_secret: config().twitchClientSecret,
            code,
            grant_type: 'authorization_code',
            redirect_uri: config().twitchRedirectUri,
        },
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );

    return response.data;
};

const getUser = async ({ token, twitchId }: { token: string; twitchId: string }) => {
    const response = await axios.get('https://api.twitch.tv/helix/users', {
        headers: {
            'Client-ID': config().twitchClientId,
            Authorization: `Bearer ${token}`,
        },
        params: {
            id: twitchId,
        },
    });
    const twitchUserData = response.data?.data?.[0];
    return {
        twitchId: twitchUserData.id,
        email: twitchUserData.email,
        displayName: twitchUserData.display_name,
        profileImageUrl: twitchUserData.profile_image_url,
    };
};

const getSubStatus = async ({ token, userId }: { token: string; userId: string }) => {
    try {
        const response = await axios.get('https://api.twitch.tv/helix/subscriptions/user', {
            headers: {
                'Client-ID': config().twitchClientId,
                Authorization: `Bearer ${token}`,
            },
            params: {
                broadcaster_id: '78854566',
                user_id: userId,
            },
        });
        const subData = response.data?.data?.[0];
        return {
            isSub: true,
            isGift: subData.is_gift,
            tier: Number(subData.tier) / 1000,
        };
    } catch (error: any) {
        if (error?.response?.status === 404) {
            return {
                isSub: false,
                isGift: false,
                tier: 0,
            };
        }

        throw error;
    }
};

export const TwitchAPIService = {
    getToken,
    getUser,
    getSubStatus,
};
