import { AnimatePresence } from 'motion/react';
import { NominationProps } from './VoteFrameWrapper';
import * as motion from 'motion/react-client';
import { classNames } from 'primereact/utils';
import { AudioPlayer } from './AudioPlayer';
import { Button } from 'pixel-retroui';

export const AudioFrame = ({
  nomination,
  isSelected,
  setVote,
  removeVote,
  indexOfCategory
}: NominationProps) => {
  return (
    <AnimatePresence>
      <motion.div
        key={`frame-${nomination.id}`}
        initial={{ opacity: 0, y: -100, backgroundColor: '#F7DFAE', borderColor: '#F7DFAE' }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: isSelected ? '#F88D3C' : '#F7DFAE',
          borderColor: isSelected ? '#F88D3C' : '#F7DFAE'
        }}
        exit={{ opacity: 0, y: -100, backgroundColor: '#F7DFAE', borderColor: '#F7DFAE' }}
        transition={{
          duration: 0.3,
          delay: 0.1 * (indexOfCategory / 1.5),
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 }
        }}
        className={classNames('relative flex w-[50rem] overflow-hidden rounded-lg border-2', {
          'border-[#F7DFAE] bg-[#F7DFAE]': !isSelected,
          'border-[#F88D3C] bg-[#F88D3C]': isSelected
        })}
      >
        <AudioPlayer src={nomination.src} />

        <motion.div
          key={`overlay-1-${nomination.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-1 left-1 z-20"
        >
          <div className="bg-black bg-opacity-70 text-xl text-white">{nomination.title}</div>
        </motion.div>

        <div className="flex flex-col items-center justify-center text-nowrap">
          <Button
            bg="black"
            textColor="white"
            shadow="black"
            borderColor="#7f61ff"
            className="w-[8rem]"
            onClick={() => (isSelected ? removeVote() : setVote())}
          >
            {!isSelected ? 'Votar' : 'Quitar Voto'}
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
