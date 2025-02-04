import { useEffect, useRef } from 'react';
import domToImage from 'dom-to-image';

import { Ticket } from '@/components/Ticket';
import { useAuth } from '@/hooks/useAuth';
import { Button } from 'pixel-retroui';

export const TicketPage = () => {
  const { user, twitchLogin } = useAuth();
  //move the ticket relative to mouse position in 3d space
  // const handleMouseMove = (e: MouseEvent) => {
  //   const ticket = document.querySelector('.ticket') as HTMLElement;
  //   const x = e.clientX / window.innerWidth - 0.5;
  //   const y = e.clientY / window.innerHeight - 0.5;
  //   ticket.style.transform = `rotateY(${x * 30}deg) rotateX(${y * 30}deg)`;
  // };

  // useEffect(() => {
  //   document.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  const ticketRef = useRef<HTMLDivElement>(null);

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    await document.fonts.ready;

    const dataUrl = await domToImage.toPng(ticketRef.current);

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'ticket.png';
    link.click();
  };

  useEffect(() => {
    if (!user) twitchLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center pt-[15vh]">
      {user ? (
        <div className="flex flex-col items-center gap-10 text-center">
          <section className="flex flex-col items-center gap-5">
            <h1 className="text-4xl text-[#]">Obten tu ticket!</h1>
            <p>Y participa por un sorteo sorpresa del evento!</p>
            <p className="text-sm">Si eres suscriptor tienes más probabilidades de ganar.</p>
          </section>

          <div ref={ticketRef}>
            <Ticket />
          </div>

          <section className="mt-10 flex gap-5">
            <Button
              bg="#913ddb"
              textColor="white"
              shadow="black"
              borderColor="#7f61ff"
              onClick={downloadTicket}
              className="flex items-center justify-center gap-2"
            >
              Descargar
            </Button>
          </section>
        </div>
      ) : (
        <h1>Esperando a que inicies sesión...</h1>
      )}
    </div>
  );
};
