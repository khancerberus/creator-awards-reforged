import { config } from '@/config/system';

export const REDIRECT_URL =
  'https://id.twitch.tv/oauth2/authorize' +
  '?response_type=code' +
  `&client_id=${config.twitchClientId}` +
  `&redirect_uri=${config.twitchRedirectUri}` +
  '&scope=user:read:email user:read:subscriptions';
