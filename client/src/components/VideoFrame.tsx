import { classNames } from 'primereact/utils';
import { config } from '@/config/system';
import * as motion from 'motion/react-client';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Button, Popup } from 'pixel-retroui';
import { NominationProps } from './VoteFrameWrapper';

export const VideoFrame = ({
  nomination,
  isSelected,
  setVote,
  removeVote,
  indexOfCategory
}: NominationProps) => {
  const [error, setError] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        key={`frame-${nomination.id}`}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3, delay: 0.1 * (indexOfCategory / 1.5) }}
        className={classNames('relative h-[262px] w-[420px] overflow-hidden rounded-lg border-2', {
          'border-[#F7DFAE]': !isSelected,
          'border-4 border-[#F88D3C]': isSelected
        })}
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <motion.div key={`modal-${nomination.id}`} exit={{ opacity: 0 }}>
          <img
            src={nomination.preview}
            alt="preview"
            className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer object-cover"
          />
        </motion.div>

        {mouseEnter && (
          <motion.div
            key={`overlay-1-${nomination.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-0 z-20 flex h-full w-full cursor-pointer flex-col items-center justify-center bg-black"
            onClick={() => setIsOpen(true)}
          >
            <div className="text-2xl text-white">Ver clip</div>
            <div className="text-2xl text-white">{nomination.title}</div>
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

        {isOpen && (
          <motion.div
            key={`popup-${nomination.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 top-0 z-30 flex h-full w-full cursor-pointer items-center justify-center bg-black"
          >
            <Popup
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              bg="black"
              baseBg="#913ddb"
              textColor="white"
            >
              <div className="h-[40rem] w-[80rem]">
                {error ? (
                  <div>No se ha podido cargar el video</div>
                ) : (
                  <iframe
                    src={`${nomination.src}&parent=${config.host}`}
                    allowFullScreen={true}
                    className="h-full w-full"
                    onError={() => setError(true)}
                  />
                )}
              </div>
            </Popup>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
