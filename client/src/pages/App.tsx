import { Button } from 'pixel-retroui';

export const App = () => {
  return (
    <div>
      <Button
        bg="var(--bg-normal)"
        borderColor="var(--border-normal)"
        textColor="#f193ff"
        shadow="#913ddb"
        style={{
          filter: 'drop-shadow(0 0 15px var(--neon-normal))'
        }}
      >
        Click ME WIIIIII!
      </Button>

      <Button
        bg="var(--bg-accent)"
        borderColor="#7f61ff"
        textColor="var(--text-accent)"
        shadow="black"
        style={{
          filter: 'drop-shadow(0 0 15px var(--neon-normal))'
        }}
        className="font-extrabold hover:text-white"
      >
        Acentuadoooooooooo!
      </Button>
    </div>
  );
};
