import { Pause, Play } from '@phosphor-icons/react';
import { Button, Card, ProgressBar } from 'pixel-retroui';
import { useRef, useState } from 'react';

export const AudioPlayer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Card
      className="flex w-full items-center justify-center gap-5 px-2 py-1"
      bg="#913ddb"
      textColor="white"
      shadowColor="#913ddb"
      borderColor="black"
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={() => {
          setProgress(
            ((audioRef.current?.currentTime || 0) * 100) / (audioRef.current?.duration || 1)
          );
        }}
        onEnded={() => setIsPlaying(false)}
      />

      <ProgressBar size="sm" color="black" borderColor="black" progress={progress} />

      <Button
        onClick={() => {
          if (isPlaying) {
            audioRef.current?.pause();
          } else {
            audioRef.current?.play();
          }

          setIsPlaying(!isPlaying);
        }}
        bg="#913ddb"
        textColor="white"
        shadow="black"
        borderColor="black"
      >
        {isPlaying ? <Pause size={24} weight="bold" /> : <Play size={24} weight="bold" />}
      </Button>
    </Card>
  );
};
