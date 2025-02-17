import { useVoteStore } from '@/stores/VoteStore';
import { VoteFooter } from './VoteFooter';
import { VoteFrameWrapper } from './VoteFrameWrapper';
import { useEffect, useState } from 'react';

export const VoteSystem = () => {
  const currentIndex = useVoteStore((state) => state.currentIndex);
  const categories = useVoteStore((state) => state.categories);

  const [currentCategory, setCurrentCategory] = useState(categories[currentIndex]);

  // TODO - Implement progress bar

  useEffect(() => {
    setCurrentCategory(categories[currentIndex]);
  }, [currentIndex, categories]);

  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10">
      <header className="flex max-w-[70rem] flex-col items-center justify-center gap-5">
        <h2 className="text-center text-4xl">{currentCategory?.title}</h2>
        <p className="max-w-[50rem] text-[#F7DFAE]">{currentCategory?.description}</p>
      </header>

      <section className="flex w-full max-w-[70rem] flex-wrap items-center justify-center gap-10">
        {currentCategory?.nominations?.map((nomination) => (
          <article key={nomination.id} className="flex flex-col items-center gap-5">
            <VoteFrameWrapper nomination={nomination} />
          </article>
        ))}
      </section>

      <VoteFooter />
    </div>
  );
};
