import { config } from '@/config/system';
import { TwitchLogo } from '@phosphor-icons/react';
import { Button } from 'pixel-retroui';

const redirectURL =
  'https://id.twitch.tv/oauth2/authorize' +
  '?response_type=code' +
  `&client_id=${config.twitchClientId}` +
  `&redirect_uri=${config.twitchRedirectUri}` +
  '&scope=user:read:email';

export const LoginButton = () => {
  const handleClickLogin = () => {
    window.location.href = redirectURL;
  };

  return (
    <Button
      bg="#913ddb"
      textColor="#f0beff"
      shadow="black"
      borderColor="#7f61ff"
      onClick={handleClickLogin}
      className="flex items-center justify-center gap-2"
    >
      <TwitchLogo size={24} />
      Inicia sesión
    </Button>
  );
};
