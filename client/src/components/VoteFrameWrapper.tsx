import { Nomination } from '@/types/Votes';
import { VideoFrame } from './VideoFrame';
import { ImageFrame } from './ImageFrame';
import { NominationType } from '@/consts/nomination-type';
import { useEffect, useState } from 'react';
import { useVoteStore } from '@/stores/VoteStore';
import { toast } from 'sonner';
import { AudioFrame } from './AudioFrame';

export interface NominationProps {
  nomination: Nomination;
  isSelected: boolean;
  setVote: () => void;
  removeVote: () => void;
  indexOfCategory: number;
}

const NominationComponents = {
  [NominationType.VIDEO]: VideoFrame,
  [NominationType.IMAGE]: ImageFrame,
  [NominationType.AUDIO]: AudioFrame
};

const getComponentByType = ({
  nomination,
  isSelected,
  setVote,
  removeVote,
  indexOfCategory
}: NominationProps) => {
  const Component = NominationComponents[nomination.type];
  return (
    <Component
      nomination={nomination}
      isSelected={isSelected}
      setVote={setVote}
      removeVote={removeVote}
      indexOfCategory={indexOfCategory}
    />
  );
};

export const VoteFrameWrapper = ({ nomination }: { nomination: Nomination }) => {
  const [isSelected, setIsSelected] = useState(false);
  const addToVotedNominations = useVoteStore((state) => state.addToVotedNominations);
  const removeFromVotedNominations = useVoteStore((state) => state.removeFromVotedNominations);

  const currentIndex = useVoteStore((state) => state.currentIndex);
  const categories = useVoteStore((state) => state.categories);

  const [currentCategory, setCurrentCategory] = useState(categories[currentIndex]);

  const [indexOfCategory, setIndexOfCategory] = useState(
    categories
      ?.find((category) => {
        if (category.nominations.some((n) => n.id === nomination.id)) {
          return category;
        }
      })
      ?.nominations.findIndex((n) => n.id === nomination.id) || 0
  );

  useEffect(() => {
    setIndexOfCategory(
      categories
        ?.find((category) => {
          if (category.nominations.some((n) => n.id === nomination.id)) {
            return category;
          }
        })
        ?.nominations.findIndex((n) => n.id === nomination.id) || 0
    );
  }, [categories, nomination]);

  useEffect(() => {
    setCurrentCategory(categories[currentIndex]);
  }, [currentIndex, categories]);

  const setVote = () => {
    const canVote = addToVotedNominations(nomination.id);
    if (canVote) {
      setIsSelected(true);
      console.log('Voted for:', nomination.title);
    } else {
      toast.error('VoteSystem', {
        description: 'Estas votando más de lo permitido en la categoría.',
        duration: 10000
      });
    }
  };

  const removeVote = () => {
    removeFromVotedNominations(nomination.id);
    setIsSelected(false);
  };

  useEffect(() => {
    if (currentCategory?.votedNominations.includes(nomination.id)) {
      setIsSelected(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return getComponentByType({ nomination, isSelected, setVote, removeVote, indexOfCategory });
};
