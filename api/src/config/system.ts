/**
 * PORT number for the server
 */
export const PORT = Number(process.env.PORT) || 3000;

/**
 * Allowed origin for CORS
 */
export const ORIGIN = process.env.ORIGIN?.split(',') ?? 'http://localhost:5173';
