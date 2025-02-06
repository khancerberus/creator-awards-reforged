import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
  const { user, twitchLogin } = useAuth();

  useEffect(() => {
    if (!user) twitchLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center pt-[15vh]">
      {user ? <Outlet /> : <h1 className="text-2xl">Esperando a que inicies sesión...</h1>}
    </div>
  );
};
