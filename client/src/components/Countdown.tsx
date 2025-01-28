import { Card } from 'pixel-retroui';
import { useEffect, useState } from 'react';
import { EVENT_TIMESTAMP } from '@/consts/event-date';

interface PanelProps {
  label: string;
  value: string[];
}

interface CountdownData {
  days: string[];
  hours: string[];
  minutes: string[];
  seconds: string[];
}

const calculateCountdown = (timestamp: number): CountdownData => {
  const now = Date.now();
  const difference = Math.max(timestamp - now, 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    .toString()
    .padStart(2, '0')
    .split('');
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
    .toString()
    .padStart(2, '0')
    .split('');
  const minutes = Math.floor((difference / (1000 * 60)) % 60)
    .toString()
    .padStart(2, '0')
    .split('');
  const seconds = Math.floor((difference / 1000) % 60)
    .toString()
    .padStart(2, '0')
    .split('');

  return { days, hours, minutes, seconds };
};

const Panel = ({ label, value }: PanelProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Card
        className="flex h-[8rem] w-[10rem] flex-col items-center justify-center gap-2"
        bg="black"
        textColor="white"
        shadowColor="#913ddb"
        borderColor="#7f61ff"
      >
        <h2 className="text-6xl font-bold">
          {value.map((digit, index) => (
            <span key={index} className="inline-block">
              {digit}
            </span>
          ))}
        </h2>
      </Card>
      <Card bg="black" textColor="white" shadowColor="#913ddb" borderColor="#7f61ff">
        <p className="text-xl">{label}</p>
      </Card>
    </div>
  );
};

export const Countdown = () => {
  const [countdown, setCountdown] = useState<CountdownData>(calculateCountdown(EVENT_TIMESTAMP));
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (completed) return;

    const interval = setInterval(() => {
      const newCountdown = calculateCountdown(EVENT_TIMESTAMP);
      setCountdown(newCountdown);

      if (
        newCountdown.days.join('') === '00' &&
        newCountdown.hours.join('') === '00' &&
        newCountdown.minutes.join('') === '00' &&
        newCountdown.seconds.join('') === '00'
      ) {
        setCompleted(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [completed]);

  return (
    <section className="flex gap-5">
      <Panel label="Días" value={countdown.days} />
      <Panel label="Horas" value={countdown.hours} />
      <Panel label="Minutos" value={countdown.minutes} />
      <Panel label="Segundos" value={countdown.seconds} />
    </section>
  );
};
