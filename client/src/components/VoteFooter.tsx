import { useVoteStore } from '@/stores/VoteStore';
import { ArrowFatLeft, ArrowFatRight, CheckCircle } from '@phosphor-icons/react';
import { Button, Popup } from 'pixel-retroui';
import { useState } from 'react';
import * as motion from 'motion/react-client';
import { AnimatePresence } from 'motion/react';
import { Category } from '@/types/Votes';

const isCategoryVoted = (category: Category) =>
  category.votedNominations.length >= category.maxVotes;

export const VoteFooter = () => {
  const categories = useVoteStore((state) => state.categories);
  const currentIndex = useVoteStore((state) => state.currentIndex);
  const decrementIndex = useVoteStore((state) => state.decrementIndex);
  const incrementIndex = useVoteStore((state) => state.incrementIndex);
  const setCurrentIndex = useVoteStore((state) => state.setCurrentIndex);

  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);

  return (
    <section className="flex w-[30rem] items-center justify-center gap-10">
      <div className="flex flex-1 items-center justify-center">
        <Button
          bg="#913ddb"
          textColor="#f0beff"
          shadow="black"
          borderColor="#7f61ff"
          className="flex w-[3rem] items-center justify-center gap-2 transition-colors duration-200 hover:text-white"
          onClick={decrementIndex}
        >
          <ArrowFatLeft size={24} weight="bold" />
        </Button>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Button
          bg="black"
          textColor="white"
          shadow="black"
          borderColor="#7f61ff"
          className="flex w-[10rem] items-center justify-center gap-2 transition-colors duration-200 hover:text-[#af7fda]"
          onClick={() => setIsCategoriesVisible(!isCategoriesVisible)}
        >
          {currentIndex + 1} / {categories.length}
        </Button>

        <AnimatePresence>
          {isCategoriesVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-50"
            >
              <Popup
                isOpen={isCategoriesVisible}
                onClose={() => setIsCategoriesVisible(false)}
                bg="black"
                textColor="white"
                baseBg="#913ddb"
              >
                <div className="flex h-[20rem] w-[80vw] flex-col gap-5 p-2 lg:w-[40vw]">
                  <header className="text-center">
                    <h1 className="text-4xl">Categorías</h1>
                  </header>

                  <section className="flex-1 overflow-y-auto">
                    <ul className="flex w-full flex-col gap-2 overflow-hidden overflow-ellipsis pe-4">
                      {categories.map((category, index) => (
                        <li
                          key={category.id}
                          onClick={() => {
                            setIsCategoriesVisible(false);
                            setCurrentIndex(index);
                          }}
                          className="relative flex h-[24px] cursor-pointer items-center gap-2 rounded-lg px-2 transition-colors duration-300 hover:bg-[#913ddb]"
                        >
                          <div className="absolute top-0 flex items-center gap-2">
                            <CheckCircle
                              size={24}
                              color={isCategoryVoted(category) ? '#00ff00' : 'gray'}
                              className="h-[24px] w-[24px]"
                            />
                          </div>
                          <span className="ms-10 truncate">
                            {index + 1}. {category.title} - {category.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </Popup>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Button
          bg="#913ddb"
          textColor="#f0beff"
          shadow="black"
          borderColor="#7f61ff"
          className="flex w-[3rem] items-center justify-center gap-2 transition-colors duration-200 hover:text-white"
          onClick={incrementIndex}
        >
          <ArrowFatRight size={24} weight="bold" />
        </Button>
      </div>
    </section>
  );
};
