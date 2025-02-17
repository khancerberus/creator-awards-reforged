import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import * as motion from 'motion/react-client';
import { useVoteStore } from '@/stores/VoteStore';
import { VotesService } from '@/services/votes';
import { Button, Card } from 'pixel-retroui';
import { VoteSystem } from '@/components/VoteSystem';

export const VotePage = () => {
  const isVoting = useVoteStore((state) => state.isVoting);
  const setIsVoting = useVoteStore((state) => state.setIsVoting);

  const categories = useVoteStore((state) => state.categories);
  const setCategories = useVoteStore((state) => state.setCategories);

  useEffect(() => {
    if (categories.length === 0) {
      VotesService.getCategories().then((categories) => {
        setCategories(categories);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isVoting ? (
        <AnimatePresence>
          <motion.div
            key="vote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Card
              className="flex flex-col items-center justify-center gap-5 p-5 text-center"
              bg="black"
              textColor="white"
              shadowColor="#913ddb"
              borderColor="#7f61ff"
            >
              <h1 className="text-6xl text-[#F7DFAE]">¡Estas a punto de votar!</h1>
              <p className="w-[40rem]">
                Te recomendamos no saltarte ninguna categoría! Vota segun tus gustos y disfruta de
                nuestra selección!
              </p>

              <div className="mt-10">
                <Button
                  onClick={() => setIsVoting(true)}
                  bg="#913ddb"
                  textColor="#f0beff"
                  shadow="black"
                  borderColor="#7f61ff"
                >
                  Comenzar el proceso
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      ) : (
        <VoteSystem />
      )}
    </>
  );
};
