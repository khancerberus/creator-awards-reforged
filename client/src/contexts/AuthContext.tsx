import { TwitchUserType } from '@/types/TwitchUser';
import { createContext } from 'react';

export interface AuthContextType {
  user: TwitchUserType | null;
  setUser: (user: TwitchUserType | null) => void;
  login: (code: string) => void;
  logout: () => void;
  twitchLogin: () => void;
  reloadUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
