import { useAuth } from '@/hooks/useAuth';
import { TwitchLogo } from '@phosphor-icons/react';
import { Button } from 'pixel-retroui';

export const LoginButton = () => {
  const { twitchLogin } = useAuth();
  return (
    <Button
      bg="#913ddb"
      textColor="white"
      shadow="black"
      borderColor="#7f61ff"
      onClick={twitchLogin}
      className="flex items-center justify-center gap-2"
    >
      <TwitchLogo size={24} />
      Inicia sesión
    </Button>
  );
};
