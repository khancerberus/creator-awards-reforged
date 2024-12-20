import { AuthService } from '@/services/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      AuthService.getToken({ code })
        .then((token) => {
          localStorage.setItem('token', token);
          toast.success('Inicio de sesión', { description: 'Hola creator!' });
          navigate('/');
        })
        .catch((error) => {
          toast.warning('Inicio de sesión', { description: error.message });
          navigate('/');
        });
    }
  }, [navigate]);

  return <div></div>;
};
