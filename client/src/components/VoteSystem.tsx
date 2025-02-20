import { useVoteStore } from '@/stores/VoteStore';
import { VoteFooter } from './VoteFooter';
import { VoteFrameWrapper } from './VoteFrameWrapper';
import { useEffect, useState } from 'react';
import { Button, Popup } from 'pixel-retroui';
import {
  ArrowFatLineLeft,
  ArrowFatLineRight,
  CircleNotch,
  Pencil,
  TrayArrowDown,
  WarningCircle
} from '@phosphor-icons/react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { classNames } from 'primereact/utils';
import { VotesService } from '@/services/votes';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useAuth } from '@/hooks/useAuth';

export const VoteSystem = () => {
  const { user, setUser } = useAuth();
  const currentIndex = useVoteStore((state) => state.currentIndex);
  const categories = useVoteStore((state) => state.categories);
  const resetStore = useVoteStore((state) => state.reset);

  const [currentCategory, setCurrentCategory] = useState(categories[currentIndex]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSendingVotes, setIsSendingVotes] = useState(false);
  const [uploadingVotes, setUploadingVotes] = useState(false);

  const uploadVotes = async () => {
    setUploadingVotes(true);
    VotesService.uploadVotes(categories)
      .then((message) => {
        toast.success('VoteSystem', {
          description: message
        });
        confetti({
          particleCount: 150,
          spread: 180
        });

        if (user) {
          setUser({ ...user, hasVoted: true });
        }
        resetStore();
        setIsSendingVotes(false);
      })
      .catch((error) => {
        if (error.response) {
          toast.error('VoteSystem', {
            description: error.response.data.message
          });
        } else {
          toast.error('VoteSystem', {
            description: 'Error desconocido. Por favor, reporta este error.'
          });
        }
      })
      .finally(() => {
        setUploadingVotes(false);
      });
  };

  useEffect(() => {
    setCurrentCategory(categories[currentIndex]);

    const isAllCategoriesVoted = categories.every(
      (category) => category.votedNominations.length >= category?.maxVotes
    );
    setIsCompleted(isAllCategoriesVoted);
  }, [currentIndex, categories]);

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-5">
      <header className="flex max-w-[70rem] flex-col items-center justify-center gap-5 text-center">
        <h2 className="text-4xl">{currentCategory?.title}</h2>
        <p className="max-w-[50rem] text-xl text-[#F7DFAE]">{currentCategory?.description}</p>
        {currentCategory?.maxVotes > 1 && (
          <p className="text-sm text-red-300">
            Tienes hasta <span className="text-red-500">({currentCategory?.maxVotes})</span> votos
            en esta categoría
          </p>
        )}
      </header>

      <section className="flex w-full max-w-[70rem] flex-wrap items-center justify-center gap-10">
        {currentCategory?.nominations?.map((nomination) => (
          <article key={nomination.id} className="flex flex-col items-center gap-5">
            <VoteFrameWrapper nomination={nomination} />
          </article>
        ))}
      </section>

      <ul className="flex w-full max-w-[70rem] items-center justify-center gap-5">
        <AnimatePresence mode="popLayout">
          <motion.li
            key={0}
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="p-5"
          >
            <VoteFooter />
          </motion.li>

          {isCompleted && (
            <motion.li
              key={0}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <motion.div
                className="flex items-center justify-center"
                animate={{ x: [0, -5] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: 0.2,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              >
                <ArrowFatLineRight size={24} weight="fill" color="#7f61ff" />
              </motion.div>
              <Button
                bg="#7f61ff"
                textColor="#ddd"
                shadow="black"
                borderColor="#7f61ff"
                className="transition-all duration-300 hover:scale-110 hover:text-[white] active:scale-90 active:duration-75"
                onClick={() => setIsSendingVotes(true)}
              >
                Enviar votos
              </Button>
              <motion.div
                className="flex items-center justify-center"
                animate={{ x: [0, 5] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: 0.2,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
              >
                <ArrowFatLineLeft size={24} weight="fill" color="#7f61ff" />
              </motion.div>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>

      <motion.div>
        <Popup
          isOpen={isSendingVotes}
          onClose={() => {
            setIsSendingVotes(false);
          }}
          bg="black"
          textColor="white"
          baseBg="#913ddb"
        >
          <div className="flex flex-col items-center justify-center gap-5 p-5">
            <header className="flex flex-col items-center justify-center gap-5">
              <h1 className="text-4xl">Estas a punto de enviar tus votos!</h1>
            </header>

            <section className="flex flex-col items-center justify-center gap-2">
              <p className="text-xl">¿Estás segura/o de tu decisión?</p>
              <p className="flex items-center justify-center gap-2 text-[#EE4444]">
                <WarningCircle size={24} weight="bold" />
                No podrás volver a votar después de enviarlos.
              </p>
            </section>

            <footer className="flex items-center justify-center gap-5">
              <Button
                bg="#444"
                textColor="white"
                shadow="black"
                borderColor="#444"
                className={classNames(
                  'flex items-center justify-center gap-2',
                  !uploadingVotes &&
                    'transition-transform duration-300 hover:scale-110 active:scale-90 active:duration-75',
                  uploadingVotes && 'translate-y-0 cursor-not-allowed'
                )}
                onClick={uploadVotes}
                disabled={uploadingVotes}
              >
                {uploadingVotes ? (
                  <CircleNotch className="animate-spin" size={32} weight="bold" />
                ) : (
                  <TrayArrowDown size={32} weight="bold" />
                )}{' '}
                Enviar votos
              </Button>

              <Button
                bg="#7f61ff"
                textColor="white"
                shadow="black"
                borderColor="#7f61ff"
                className="flex items-center justify-center gap-2 transition-transform duration-300 hover:scale-110 active:scale-90 active:duration-75"
                onClick={() => {
                  setIsSendingVotes(false);
                }}
              >
                <Pencil size={32} weight="bold" /> Seguir modificando
              </Button>
            </footer>
          </div>
        </Popup>
      </motion.div>
    </div>
  );
};
