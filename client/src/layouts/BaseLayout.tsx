import { PrimeReactProvider } from 'primereact/api';
import { Outlet } from 'react-router-dom';
import { Navigator } from '@/components/Navigator';
import Tailwind from 'primereact/passthrough/tailwind';
import { Toaster } from "sonner"

export const BaseLayout = () => {
  return (
    <PrimeReactProvider
      value={{
        unstyled: true,
        pt: Tailwind,
      }}
    >
      <Toaster theme="dark" richColors />
      <main className="flex flex-col gap-5 w-full justify-center items-center">
        <Navigator />
        <Outlet />
      </main>
    </PrimeReactProvider>
  );
};
