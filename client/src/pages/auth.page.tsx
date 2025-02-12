import { useAuth } from '@/hooks/useAuth';
import { useEffect, useRef } from 'react';
import '@/assets/css/auth.css';

export const AuthPage = () => {
  const { login } = useAuth();
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      login(code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10 pt-[15vh]">
      <div className="loader"></div>
      No desesperes, estamos preparando tu sesión...
    </div>
  );
};
