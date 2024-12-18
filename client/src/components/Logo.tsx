import { classNames } from 'primereact/utils';

export const Logo = () => {
  return (
    <div className={classNames('flex items-center gap-2', 'transition-colors duration-200')}>
      <img src="/images/logo-pixel.png" alt="Logo" className="w-[65px] md:w-[90px]" />
      <div className="flex flex-col">
        <span>Creator</span>
        <span>Awards</span>
        <span>2024</span>
      </div>
    </div>
  );
};
