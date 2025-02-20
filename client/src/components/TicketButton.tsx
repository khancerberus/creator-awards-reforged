import { useNavigate } from 'react-router-dom';
import { DefaultButton } from './DefaultButton';

export const TicketButton = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate('/ticket');
  };

  return <DefaultButton onClick={handleClickLogin}>Conseguir mi ticket</DefaultButton>;
};
