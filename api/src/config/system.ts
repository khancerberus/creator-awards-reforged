const {
    NODE_ENV: nodeEnv = 'development',
    PORT: port = '3000',
    ORIGIN: origin = 'http://localhost:5173',
    BASE_PATH: basePath = '/api/v1',
    DB_URI: dbUri = 'postgres://postgres:postgres@localhost:5432/postgres',
    TWITCH_CLIENT_ID: twitchClientId,
    TWITCH_CLIENT_SECRET: twitchClientSecret,
    TWITCH_REDIRECT_URI: twitchRedirectUri = 'http://localhost:3000/api/v1/auth/token',
    SESSION_SECRET: sessionSecret = 'secret',
} = process.env;

/**
 * Configuration for the server
 *
 * - isProduction: Whether the server is running in production mode
 * - port: PORT number for the server
 * - origin: Allowed origin for CORS
 * - basePath: Base path for the API
 * - dbUri: Database URI for connecting to the database
 * - twitchClientId: Client ID for Twitch API
 * - twitchClientSecret: Client Secret for Twitch API
 * - twitchRedirectUri: Redirect URI for Twitch API
 * - sessionSecret: Secret for sessions
 */
export const config = () => ({
    isProduction: nodeEnv === 'production',
    port,
    origin,
    basePath,
    dbUri,
    twitchClientId,
    twitchClientSecret,
    twitchRedirectUri,
    sessionSecret,
});
