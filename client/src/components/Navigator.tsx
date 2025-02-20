import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from './Logo';
import '../assets/css/navigator.css';
import { LoginButton } from './LoginButton';
import { classNames } from 'primereact/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from 'pixel-retroui';
import { SignOut } from '@phosphor-icons/react';

interface ItemLinkProps {
  to: string;
  label: string;
  disabled?: boolean;
}

const ItemLink = ({ to, label, disabled = false }: ItemLinkProps) => {
  return (
    <>
      {disabled ? (
        <div className="cursor-not-allowed text-gray-500">{label}</div>
      ) : (
        <Link
          to={to}
          className="flex items-center justify-center text-[#F7DFAE] transition-colors duration-200 hover:text-[#F88D3C]"
        >
          {label}
        </Link>
      )}
    </>
  );
};

export const Navigator = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <nav
      className={classNames(
        'sticky flex h-[15vh] w-full max-w-[1300px] flex-col items-center justify-center gap-2'
      )}
    >
      <div className="flex w-full max-w-[1000px] items-center justify-between">
        <section className="flex w-[30rem] items-center justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </section>

        <section className="flex w-[30rem] items-center justify-center gap-5">
          <ItemLink to="/ticket" label="Ticket" />
          <ItemLink to="/vote" label="Votar" disabled />
          <ItemLink to="/#about" label="¿Qué es esto?" />
        </section>

        <section className="flex w-[30rem] items-center justify-center">
          {!user ? (
            <LoginButton />
          ) : (
            <div className="flex items-center justify-center gap-5">
              <div className="relative h-[60px] w-[60px] overflow-hidden rounded-full border-2 border-[#d8bd72]">
                <img src={user?.profileImageUrl} alt="" />
              </div>
              <Button
                onClick={logout}
                bg="#E41E2E"
                textColor="#F7DFAE"
                borderColor="#88121b"
                shadow="#5b0c12"
              >
                <SignOut size={20} weight="bold" />
              </Button>
            </div>
          )}
        </section>
      </div>
      <div
        className="flex h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, #0000 10%, #F7DFAE 35% 65%, #0000 90%)'
        }}
      ></div>
    </nav>
  );
};
