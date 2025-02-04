import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';

export const AuthPage = () => {
  const { login } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      login(code);
    }
    // eslint-disable-next-line
  }, []);

  return <div></div>;
};
