import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Logo } from './Logo';
import '../assets/css/navigator.css';
import { LoginButton } from './LoginButton';
import { classNames } from 'primereact/utils';
import { useAuth } from '@/hooks/useAuth';

interface ItemLinkProps {
  to: string;
  label: string;
}

const ItemLink = ({ to, label }: ItemLinkProps) => {
  return (
    <Link
      to={to}
      className="flex items-center justify-center text-[#F7DFAE] transition-colors duration-200 hover:text-[#F88D3C]"
    >
      {label}
    </Link>
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
        'absolute top-0 z-10 flex h-[15vh] w-full max-w-[1300px] flex-col items-center justify-center gap-2',
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
          <ItemLink to="/vote" label="Votar" />
          <ItemLink to="/#about" label="¿Qué es esto?" />
        </section>

        <section className="flex w-[30rem] items-center justify-center">
          {!user ? (
            <LoginButton />
          ) : (
            <div className="flex cursor-pointer items-center justify-center" onClick={logout}>
              {user.displayName}
            </div>
          )}
        </section>
      </div>
      <div
        className="flex h-[2px] w-full"
        style={{
          background: 'linear-gradient(90deg, #0000 10%, #F7DFAE 35% 65%, #0000 90%)',
        }}
      ></div>
    </nav>
  );
};
