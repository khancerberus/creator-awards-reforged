const {
    PORT: port = '3000',
    ORIGIN: origin = 'http://localhost:5173',
    BASE_PATH: basePath = '/api/v1'
} = process.env;

/**
 * Configuration for the server
 *
 * - port: PORT number for the server
 * - origin: Allowed origin for CORS
 */
export const config = {
    /**
     * PORT number for the server
     */
    port,

    /**
     * Allowed origin for CORS
     */
    origin,

    /**
     * Base path for the API
     */
    basePath
};
