import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import domToImage from 'dom-to-image';
import * as motion from 'motion/react-client';

import { Ticket } from '@/components/Ticket';
import { useAuth } from '@/hooks/useAuth';
import { Button, Card } from 'pixel-retroui';
import { useSpring, useTransform } from 'motion/react';
import { DownloadSimple, Ticket as TicketIcon, TwitchLogo } from '@phosphor-icons/react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { TicketService } from '@/services/tickets';

const width = 430;
const height = 1080;
const sheenSize = 500;

export const TicketPage = () => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useAuth();
  const [isParticipating, setIsParticipating] = useState(false);

  const generateTicket = () => {
    TicketService.generate()
      .then((ticket) => {
        if (!user) return;
        console.log(user);
        setUser({ ...user, ticket });
        toast.success('Ticket guardado, estás participando en el sorteo!');
        confetti({
          particleCount: 150,
          spread: 180,
        });
        setIsParticipating(true);
      })
      .catch((error) => {
        toast.error('Error al generar ticket', { description: error.message });
      });
  };

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
  };

  const handleMouseLeave: MouseEventHandler = () => {
    scale.set(1);
    xPercentage.set(0);
    yPercentage.set(0);
  };

  useEffect(() => {
    if (user?.ticket?.id) {
      setIsParticipating(true);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center pt-[15vh]">
      {!isParticipating ? (
        <Card
          className="flex max-w-[40rem] flex-col items-center gap-10 p-5 text-center"
          bg="black"
          textColor="white"
          shadowColor="#913ddb"
          borderColor="#7f61ff"
        >
          <h1 className="text-6xl text-[#F7DFAE]">Obtén tu ticket!</h1>
          <p>
            Participa por un sorteo sorpresa del evento! Si eres suscriptor tienes más
            probabilidades de ganar.
          </p>

          <section className="flex gap-5">
            <Button
              bg="#913ddb"
              textColor="white"
              shadow="black"
              borderColor="#7f61ff"
              onClick={() => {
                window.open(
                  'https://www.twitch.tv/subs/coteparrague',
                  '_blank',
                  `scrollbars=yes,width=${width},height=${height}`,
                );
              }}
              className="flex items-center justify-center gap-2"
            >
              <TwitchLogo size={28} />
              Suscribirse
            </Button>

            <Button
              bg="#913ddb"
              textColor="white"
              shadow="black"
              borderColor="#7f61ff"
              onClick={generateTicket}
              className="flex items-center justify-center gap-2"
            >
              <TicketIcon size={28} />
              Generar Ticket
            </Button>
          </section>
        </Card>
      ) : (
        <div className="flex flex-col items-center gap-10 text-center">
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              scale: { type: 'spring', visualDuration: 0.3, bounce: 0.2 },
            }}
            style={{
              transformStyle: 'preserve-3d',
              // @ts-expect-error motionvalue can be used as a number
              rotateX,
              // @ts-expect-error motionvalue can be used as a number
              rotateY,
              // @ts-expect-error motionvalue can be used as a number
              scale,
            }}
            className="group relative overflow-hidden rounded-lg shadow-lg"
          >
            <motion.div
              className="absolute z-10 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-30"
              style={{
                background: 'radial-gradient(white, #3984ff00 80%)',
                // @ts-expect-error motionvalue can be used as a number
                left: sheenX,
                // @ts-expect-error motionvalue can be used as a number
                top: sheenY,
                height: sheenSize,
                width: sheenSize,
              }}
            />
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
              <DownloadSimple size={28} />
              Descargar
            </Button>
          </section>
        </div>
      )}
    </div>
  );
};
