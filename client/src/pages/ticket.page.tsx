import { MouseEventHandler, useEffect, useRef } from 'react';
import domToImage from 'dom-to-image';
import * as motion from 'motion/react-client';

import { Ticket } from '@/components/Ticket';
import { useAuth } from '@/hooks/useAuth';
import { Button } from 'pixel-retroui';
import { useSpring, useTransform } from 'motion/react';

const sheenSize = 500;

export const TicketPage = () => {
  const { user, twitchLogin } = useAuth();
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

  const xPercentage = useSpring(0, { bounce: 0 });
  const yPercentage = useSpring(0, { bounce: 0 });
  const scale = useSpring(1, { bounce: 0 });
  const mouseX = useSpring(0, { bounce: 0 });
  const mouseY = useSpring(0, { bounce: 0 });

  const rotateX = useTransform(yPercentage, [-0.5, 0.5], ['-15deg', '15deg']);
  const rotateY = useTransform(xPercentage, [-0.5, 0.5], ['-15deg', '15deg']);

  const sheenX = useTransform(() => mouseX.get() - sheenSize / 2);
  const sheenY = useTransform(() => mouseY.get() - sheenSize / 2);

  const getMousePosition = (e: React.MouseEvent<Element, MouseEvent>) => {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();

    const currentMouseX = e.clientX - left;
    const currentMouseY = e.clientY - top;

    return {
      currentMouseX,
      currentMouseY,
      containerWidth: width,
      containerHeight: height,
    };
  };

  const handleMouseMove: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY, containerWidth, containerHeight } = getMousePosition(e);

    xPercentage.set(currentMouseX / containerWidth - 0.5);
    yPercentage.set(currentMouseY / containerHeight - 0.5);

    mouseX.set(currentMouseX);
    mouseY.set(currentMouseY);
  };

  const handleMouseEnter: MouseEventHandler = (e) => {
    const { currentMouseX, currentMouseY } = getMousePosition(e);

    scale.set(1.05);

    mouseX.jump(currentMouseX);
    mouseY.jump(currentMouseY);
  }

  const handleMouseLeave: MouseEventHandler = () => {
    scale.set(1);
    xPercentage.set(0);
    yPercentage.set(0);
  }

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

          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              scale: { type: 'spring', visualDuration: 0.4, bounce: 0.5 },
            }}
            style={{
              transformStyle: 'preserve-3d',
              rotateX,
              rotateY,
              scale,
            }}
            className="relative shadow-lg overflow-hidden group rounded-lg"
          >
            <motion.div className="absolute z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full blur-md" style={{
              background: 'radial-gradient(white, #3984ff00 80%)',
              left: sheenX,
              top: sheenY,
              height: sheenSize,
              width: sheenSize,
            }} />
            <div ref={ticketRef} className="-z-50">
              <Ticket />
            </div>
          </motion.div>

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
