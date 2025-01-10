import { Button } from "pixel-retroui"
import { useNavigate } from "react-router-dom"

export const TicketButton = () => {
  const navigate = useNavigate()

  const handleClickLogin = () => {
    navigate("/ticket")
  }

  return (
    <Button
      bg="#913ddb"
      textColor="#f0beff"
      shadow="black"
      borderColor="#7f61ff"
      onClick={handleClickLogin}
      className="flex items-center justify-center gap-2"
    >
      Conseguir mi ticket
    </Button>
  );
};
