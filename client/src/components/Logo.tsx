import { classNames } from 'primereact/utils';

export const Logo = () => {
  return (
    <div
      className={classNames(
        'flex items-center gap-2 rounded-full',
        'transition-colors duration-200',
        'bg-[#F3DAA2]/20 hover:bg-[#F3DAA2]/30 active:bg-[#F3DAA2]',
      )}
    >
      <img src="/icon.png" alt="Logo" className="w-[65px] md:w-[50px]" />
    </div>
  );
};
