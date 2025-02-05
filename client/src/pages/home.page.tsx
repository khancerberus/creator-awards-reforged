import { Card } from 'pixel-retroui';
import * as motion from 'motion/react-client';
import { LoginButton } from '@/components/LoginButton';
import { Countdown } from '@/components/Countdown';
import { TicketButton } from '@/components/TicketButton';
import { useAuth } from '@/hooks/useAuth';
import '@/assets/css/home.css';

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="home-page flex flex-col items-center justify-center">
      <section className="first-section flex min-h-screen flex-col items-center justify-center gap-10 pt-[10vh]">
        <motion.div
          className="flex flex-col items-center justify-center gap-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <h1
            className="select-none text-[110px] font-bold"
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],}}
            >
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
            {user ? <TicketButton /> : <LoginButton />}
          </Card>
        </motion.div>
      </section>

      <section
        id="about"
        className="flex h-screen w-full items-center justify-center gap-5 bg-[#101016]"
      >
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
