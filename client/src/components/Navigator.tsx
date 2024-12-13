import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { DotsThreeOutlineVertical } from '@phosphor-icons/react';
import { classNames } from 'primereact/utils';
import { motion, AnimatePresence } from 'motion/react';

import '../assets/css/navigator.css';

interface ItemLinkProps {
  to: string;
  label: string;
}

const ItemLink = ({ to, label }: ItemLinkProps) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-center rounded-full px-4 py-2 text-[#F7DFAE] transition-colors duration-200 hover:bg-[#16161D] hover:text-[#F88D3C]"
    >
      {label}
    </Link>
  );
};

export const Navigator = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <nav className="z-20 relative flex w-full justify-between bg-black md:mt-5 md:w-[50rem] md:rounded-full md:px-10">
      <div className="px-5 py-2">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className={isMobile ? 'flex px-5 py-2' : 'hidden'}>
        <Button
          icon={<DotsThreeOutlineVertical size={24} />}
          rounded
          outlined
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
      </div>

      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            className={classNames(
              isOpen ? 'flex' : 'hidden',
              isMobile ? 'absolute left-0 top-full w-full flex-col bg-black z-10' : 'flex-row',
            )}
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
          >
            <ItemLink to="/ticket" label="Ticket" />
            <ItemLink to="/vote" label="Votar" />
            <ItemLink to="/about" label="Qué es esto?" />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
