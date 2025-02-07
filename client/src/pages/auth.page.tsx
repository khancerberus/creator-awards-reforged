import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import '@/assets/css/auth.css';

export const AuthPage = () => {
  const { login } = useAuth();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      login(code);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center pt-[15vh] gap-10">
      <div className="loader"></div>
      No desesperes, estamos preparando tu sesión...
    </div>
  );
};
