import { api } from '@/lib/api';
import { TwitchUserType } from '@/types/TwitchUser';

const openSession = async ({ code }: { code: string }): Promise<TwitchUserType> => {
  const response = await api.post('/auth/open-session', { code });
  return response.data.user;
};

const closeSession = async (): Promise<string> => {
  const response = await api.get('/auth/close-session');
  return response.data.message;
};

const getSessionUser = async (): Promise<TwitchUserType> => {
  const response = await api.get('/auth/user');
  return response.data.user;
};

const reloadUser = async (): Promise<TwitchUserType> => {
  const response = await api.get('/auth/user/reload');
  return response.data.user;
}

export const AuthService = {
  openSession,
  closeSession,
  getSessionUser,
  reloadUser
};
