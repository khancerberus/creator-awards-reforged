import { AnimatePresence } from 'motion/react';
import { classNames } from 'primereact/utils';
import { useState } from 'react';
import * as motion from 'motion/react-client';
import { NominationProps } from './VoteFrameWrapper';
import { Image } from 'primereact/image';
import { MagnifyingGlassPlus } from '@phosphor-icons/react';
import { Button } from 'pixel-retroui';

export const ImageFrame = ({
  nomination,
  isSelected,
  setVote,
  removeVote,
  indexOfCategory
}: NominationProps) => {
  const [mouseEnter, setMouseEnter] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        key={`frame-${nomination.id}`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        transition={{ duration: 0.3, delay: 0.15 * (indexOfCategory / 2) }}
        className={classNames('relative h-[262px] w-[420px] overflow-hidden rounded-lg border-2', {
          'border-[#F7DFAE]': !isSelected,
          'border-4 border-[#F88D3C]': isSelected
        })}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <Image
          src={nomination.src}
          alt={nomination.title}
          indicatorIcon={<MagnifyingGlassPlus size={48} />}
          preview
          pt={{
            root: {
              className: 'h-full w-full'
            },
            image: {
              className: 'h-full w-full object-cover'
            }
          }}
        />

        {mouseEnter && (
          <motion.div
            key={`overlay-1-${nomination.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 z-20"
          >
            <div className="bg-black bg-opacity-70 text-2xl text-white">{nomination.title}</div>
          </motion.div>
        )}

        {mouseEnter && !isSelected && (
          <motion.div
            key={`overlay-2-${nomination.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-0 z-20 p-2"
          >
            <Button bg="#7f61ff" textColor="white" onClick={setVote}>
              Votar
            </Button>
          </motion.div>
        )}

        {isSelected && (
          <motion.div
            key={`overlay-3-${nomination.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-0 z-20 p-2"
          >
            <Button bg="#7f61ff" textColor="white" onClick={removeVote}>
              Quitar voto
            </Button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
