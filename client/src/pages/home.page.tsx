import { Card } from 'pixel-retroui';
import * as motion from 'motion/react-client';
import { LoginButton } from '@/components/LoginButton';
import { Countdown } from '@/components/Countdown';
import { TicketButton } from '@/components/TicketButton';
import { useAuth } from '@/hooks/useAuth';
import '@/assets/css/home.css';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Footer } from '@/components/Footer';

export const HomePage = () => {
  const location = useLocation();
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(false); // Resetea la animación al cambiar de ruta
    const handleLoad = () => setIsLoaded(true);

    if (document.readyState === 'complete') {
      handleLoad(); // Si la página ya cargó, activa la animación
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => window.removeEventListener('load', handleLoad);
  }, [location.pathname]); // Se ejecuta al cambiar de ruta

  return (
    <div className="flex w-full flex-col">
      <motion.div ref={constraintsRef} className="first-section flex h-[85vh] flex-col items-center justify-center gap-10">
        <motion.div
          key={location.pathname}
          className="left-30 right-30 top-50 absolute -z-10"
          initial={{ scale: 0, opacity: 0 }}
          animate={isLoaded && { y: [-10, 10], scale: [0.5, 0.8, 0.9, 0.95, 1], opacity: 0.4 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 4,
            repeatType: 'reverse',
            ease: 'easeInOut',
            scale: { type: 'spring', delay: 0.5, duration: 3 },
            opacity: { delay: 0.5, duration: 4 }
          }}
        >
          <img src="/images/logo.png" alt="" className="w-full" />
        </motion.div>

        <motion.div
          key={location.pathname}
          className="flex flex-col items-center"
          initial={{ opacity: 0, scale: 0 }}
          animate={isLoaded && { opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          <h1
            className="select-none text-7xl font-bold lg:text-9xl 2xl:text-[153px]"
            style={{
              filter:
                'drop-shadow(0 0 15px #101016) drop-shadow(0 0 15px #101016) drop-shadow(0 0 15px #101016)',
              fontFamily: 'Gabriola'
            }}
          >
            Creator Awards 202
            <span className="neon-animation">4</span>
          </h1>
        </motion.div>

        <Countdown constraintsRef={constraintsRef} />

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 300 }}
          animate={isLoaded && { opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          <Card
            className="mt-10 flex flex-col items-center justify-center gap-4 p-2"
            bg="black"
            textColor="white"
            shadowColor="#913ddb"
            borderColor="#7f61ff"
            style={{
              filter: 'drop-shadow(0 0 15px #4d3bd9)'
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-2xl">¿Quieres participar?</h2>
              <p>¡Obtén tu ticket aquí!</p>
            </div>
            {user ? <TicketButton /> : <LoginButton />}
          </Card>
        </motion.div>
      </motion.div>

      <section
        id="about"
        className="relative flex h-screen w-full items-center justify-center gap-5"
      >
        <div className="top-50 absolute right-0 -z-10 w-[60rem]">
          <img src="/images/spyro-about2.svg" alt="" />
        </div>

        <div className="flex w-[60rem] flex-col">
          <h2 className="px-2 py-4 text-6xl">¿Qué es esto?</h2>
          <p className="px-2 py-4 font-sans text-3xl">
            <em
              className="text-5xl font-bold"
              style={{
                fontFamily: 'Gabriola'
              }}
            >
              Creator Awards
            </em>{' '}
            es una iniciativa de la comunidad de{' '}
            <em className="font-bold text-[#F7DFAE] underline hover:text-[#F88D3C]">
              <a href="https://twitch.tv/coteparrague" target="_blank" rel="noopener noreferrer">
                Coteparragué
              </a>
            </em>{' '}
            que busca reconocer y premiar a la comunidad por sus contribuciones a la creación de
            contenidos digitales ya sean clips, arte, música, memes, etc.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};
