export interface TokenFromTwitch {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string[];
    token_type: string;
    user_id: string;
}