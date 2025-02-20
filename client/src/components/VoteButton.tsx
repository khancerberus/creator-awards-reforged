import { useNavigate } from 'react-router-dom';
import { DefaultButton } from './DefaultButton';

export const VoteButton = () => {
  const navigate = useNavigate();

  const handleClickLogin = () => {
    navigate('/vote');
  };

  return <DefaultButton onClick={handleClickLogin}>Ir a votar</DefaultButton>;
};
