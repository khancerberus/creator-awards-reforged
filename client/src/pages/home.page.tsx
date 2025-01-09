import { LoginButton } from '@/components/LoginButton';
import { Countdown } from '@/components/Countdown';
import '@/assets/css/home.css';
import { Card } from 'pixel-retroui';
import { useEffect, useState } from 'react';
import { TicketButton } from '@/components/TicketButton';

export const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const getTokenExpiration = (token: string) => {
        const [, payload] = token.split('.');
        const decodedPayload = JSON.parse(atob(payload));
        console.log(decodedPayload.exp);
        console.log(Date.now() / 1000);
        return decodedPayload.exp;
      };
      if (getTokenExpiration(token) > Date.now() / 1000) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    }
  }, []);

  return (
    <div className="home-page flex flex-col items-center justify-center">
      <section className="first-section flex min-h-screen flex-col items-center justify-center gap-10 pt-[10vh]">
        <div className="flex flex-col items-center justify-center gap-10">
          <h1
            className="text-[110px] font-bold select-none"
            style={{
              filter:
                'drop-shadow(0 0 15px #101016) drop-shadow(0 0 15px #101016) drop-shadow(0 0 15px #101016)',
              fontFamily: 'Gabriola',
            }}
          >
            Creator Awards{' '}
            <span
              style={{
                filter: `drop-shadow(0 0 1.5rem #913ddb)`,
              }}
            >
              202
            </span>
            <span className="neon-animation">4</span>
          </h1>
          <Countdown />
        </div>

        <Card
          className="mt-10 flex flex-col items-center justify-center gap-4 p-2"
          bg="black"
          textColor="white"
          shadowColor="#913ddb"
          borderColor="#7f61ff"
          style={{
            filter: 'drop-shadow(0 0 15px #4d3bd9)',
          }}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-2xl">¿Quieres participar?</h2>
            <p>¡Obtén tu ticket aquí!</p>
          </div>
          {isLoggedIn ? <TicketButton /> : <LoginButton />}
        </Card>
      </section>

      <section id="about" className="flex h-screen w-full items-center justify-center gap-5 bg-[#101016]">
        <div className="flex w-[50rem] flex-col">
          <h2 className="px-2 py-4 text-6xl">¿Qué es esto?</h2>
          <p className="px-2 py-4 font-sans text-3xl">
            <em className="font-bold text-[#F7DFAE]">Creator Awards</em> es una iniciativa de la
            comunidad de <em className="font-bold">Coteparragué</em> que busca reconocer y premiar a
            la comunidad por sus contribuciones a la creación de contenidos digitales ya sean clips,
            arte, música, memes, etc.
          </p>
        </div>
      </section>

      <footer className="flex h-[20rem] w-screen bg-gradient-to-b from-[#101016] to-[#1f1f1f]"></footer>
    </div>
  );
};
