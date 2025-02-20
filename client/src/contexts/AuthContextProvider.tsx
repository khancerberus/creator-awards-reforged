import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { TwitchUserType } from '@/types/TwitchUser';
import { AuthService } from '@/services/auth';
import { REDIRECT_URL } from '@/consts/login-redirect';
import { AuthContext } from './AuthContext';

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TwitchUserType | null>(null);

  const login = (code: string) => {
    AuthService.openSession({ code })
      .then((user) => {
        if (window.opener) {
          window.opener.postMessage({ user }, window.location.origin);
          window.close();
        }
      })
      .catch((error) => {
        toast.warning('Inicio de sesión', { description: error.message });
        if (window.opener) {
          window.opener.postMessage(
            { error: 'No se ha podido iniciar sesión' },
            window.location.origin
          );
          window.close();
        }
      });
  };

  const logout = () => {
    AuthService.closeSession()
      .then(() => {
        toast.success('Cierre de sesión', { description: 'Hasta luego!' });
        setUser(null);
        navigate('/');
      })
      .catch((error) => {
        toast.error('Cierre de sesión', { description: error.message });
      });
  };

  const twitchLogin = (): void => {
    AuthService.getSessionUser()
      .then((user) => {
        setUser(user);
        toast.success('Inicio de sesión', { description: 'Hola, creator!' });
      })
      .catch((error) => {
        console.log(error);

        const w = 600;
        const h = 800;
        const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
        const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth
          ? window.innerWidth
          : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;

        const height = window.innerHeight
          ? window.innerHeight
          : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;

        // Calcula la posición para centrar la ventana
        const left = (width - w) / 2 + dualScreenLeft;
        const top = (height - h) / 2 + dualScreenTop;

        const loginWindow = window.open(
          REDIRECT_URL,
          '_blank',
          `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`
        );

        if (loginWindow) {
          const messageListener = (event: MessageEvent) => {
            if (event.origin === window.location.origin && event.data.user) {
              setUser(event.data.user);
              toast.success('Inicio de sesión', { description: 'Hola, creator!' });

              loginWindow.close();
              clearInterval(checkWindowClosed); // Detiene el intervalo si el login fue exitoso
              window.removeEventListener('message', messageListener);
            }

            if (event.origin == window.location.origin && event.data.error) {
              toast.error('Inicio de sesión', { description: event.data.error });
              loginWindow.close();
              clearInterval(checkWindowClosed); // Detiene el intervalo si el login fue exitoso
              window.removeEventListener('message', messageListener);
              navigate('/');
            }
          };
          window.addEventListener('message', messageListener);

          const checkWindowClosed = setInterval(() => {
            if (loginWindow.closed) {
              clearInterval(checkWindowClosed);
              window.removeEventListener('message', messageListener);
            }
          }, 500);
        }
      });
  };

  useEffect(() => {
    AuthService.getSessionUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, twitchLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
