import { Button } from 'pixel-retroui';
import { classNames } from 'primereact/utils';
import * as motion from 'motion/react-client';

interface DefaultButtonProps {
  onClick: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export const DefaultButton = ({ onClick, className, disabled, children }: DefaultButtonProps) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} animate={{ transition: { times: [0, 0.3, 1] } }}>
      <Button
        bg="#913ddb"
        textColor="#e0daff"
        shadow="black"
        borderColor="#4d3bd9"
        onClick={onClick}
        disabled={disabled}
        className={classNames(
          'flex items-center justify-center gap-2 transition-colors duration-200 hover:text-white',
          className
        )}
      >
        {children}
      </Button>
    </motion.div>
  );
};
