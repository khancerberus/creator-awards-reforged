const {
    VITE_API_HOST,
    VITE_TWITCH_CLIENT_ID,
    VITE_TWITCH_REDIRECT_URI,
} = import.meta.env;

export const config = {
    apiHost: VITE_API_HOST ?? 'http://localhost:3000',
    twitchClientId: VITE_TWITCH_CLIENT_ID ?? '',
    twitchRedirectUri: VITE_TWITCH_REDIRECT_URI ?? '',
}
