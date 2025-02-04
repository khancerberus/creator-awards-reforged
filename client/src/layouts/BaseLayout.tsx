import { PrimeReactProvider } from 'primereact/api';
import { Outlet } from 'react-router-dom';
import { Navigator } from '@/components/Navigator';
import Tailwind from 'primereact/passthrough/tailwind';
import { Toaster } from 'sonner';
import { AuthContextProvider } from '@/contexts/AuthContextProvider';

export const BaseLayout = () => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: Tailwind,
      }}
    >
      <AuthContextProvider>
        <Toaster theme="dark" richColors />
        <main className="flex flex-col items-center justify-center overflow-hidden">
          <Navigator />
          <Outlet />
        </main>
      </AuthContextProvider>
    </PrimeReactProvider>
  );
};
