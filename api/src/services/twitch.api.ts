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
    )

    return response.data;
};

const getUser = async ({ token, twitchId }: { token: string, twitchId: string }) => {
    const response = await axios.get('https://api.twitch.tv/helix/users', {
        headers: {
            'Client-ID': config().twitchClientId,
            Authorization: `Bearer ${token}`,
        },
        params: {
            id: twitchId,
        },
    })
    const twitchUserData = response.data?.data?.[0];
    return {
        twitchId: twitchUserData.id,
        email: twitchUserData.email,
        displayName: twitchUserData.display_name,
        profileImageUrl: twitchUserData.profile_image_url,
    };
}

export const TwitchAPIService = {
    getToken,
    getUser
};
