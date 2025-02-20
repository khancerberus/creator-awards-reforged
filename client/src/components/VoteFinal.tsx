import { TwitchLogo } from '@phosphor-icons/react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';

export const VoteFinal = () => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
        className="flex h-[85vh] w-[60rem] flex-col items-center justify-center gap-10 text-center"
      >
        <header className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-6xl">¡Gracias por participar en las votaciones!</h1>
          <h3 className="text-3xl text-[#F7DFAE]">Agradecemos tu apoyo a la comunidad ❤️</h3>
        </header>

        <section className="flex items-center justify-center">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjJyZmQyeTR2bGVubHltc2MzbzFqb2FtYXZ3eW1tZWhrdHQ2a3dodiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1jadHTB4xIMBgNT0xd/giphy.gif"
            alt="Gracias por votar"
            className="w-96"
          />
        </section>

        <section className="flex w-[40rem] flex-col items-center justify-center gap-2">
          <p className="text-center text-lg">
            El resultado de las votaciones se transmitirá en vivo en el canal de{' '}
            <a
              href="https://twitch.tv/coteparrague"
              target="_blank"
              rel="noreferrer"
              className="border-[#b088fa] px-4 py-2 text-[#b088fa] transition-colors hover:border-[#805ad5] hover:text-[#805ad5]"
            >
              <TwitchLogo size={24} weight="bold" className="inline" /> coteparrague
            </a>
          </p>

          <p className="text-center text-lg text-[#F7DFAE]">
            ¡No te lo pierdas! ¡Te esperamos en la transmisión!
          </p>
        </section>
      </motion.div>
    </AnimatePresence>
  );
};
