import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import domToImage from 'dom-to-image';
import * as motion from 'motion/react-client';

import { Ticket } from '@/components/Ticket';
import { useAuth } from '@/hooks/useAuth';
import { Button, Card } from 'pixel-retroui';
import { useSpring, useTransform } from 'motion/react';
import {
  CircleNotch,
  DownloadSimple,
  ShareNetwork,
  Ticket as TicketIcon,
  TwitchLogo
} from '@phosphor-icons/react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { TicketService } from '@/services/tickets';
import { base64ToBlob } from '@/utils/base64ToBlob';
import { toJpeg } from 'html-to-image';
import { useLocation } from 'react-router-dom';

const width = 430;
const height = 1080;
const sheenSize = 1000;

export const TicketPage = () => {
  const location = useLocation();
  const ticketRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useAuth();
  const [isParticipating, setIsParticipating] = useState(false);
  const [isUploadingImg, setIsUploadingImg] = useState(false);

  const generateTicket = () => {
    TicketService.generate()
      .then((ticket) => {
        if (!user) return;
        console.log(user);
        setUser({ ...user, ticket });
        toast.success('Ticket guardado, estás participando en el sorteo!');
        confetti({
          particleCount: 150,
          spread: 180
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
    const ticketDom = document.getElementById('ticket');
    if (!ticketDom) return;
    const dataUrl = await domToImage.toPng(ticketDom);

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
      containerHeight: height
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

  const shareTicket = () => {
    if (!user?.ticket?.id) return;

    window.open(
      `https://twitter.com/intent/tweet?url=https://awards.cotecreator.com/api/v1/tickets/${user?.ticket?.id}&text= 🚨 ALGO GRANDE ESTÁ PASANDO 🚨!%0D%0A%0D%0ALos Creator Awards están aquí… ¿Quién se llevará la gloria? 🏆✨%0D%0A%0D%0A`,
      '_blank'
    );
  };

  const saveImage = async () => {
    if (!ticketRef.current) return;
    setIsUploadingImg(true);

    await document.fonts.ready;

    const imageBase64 = await toJpeg(ticketRef.current, {
      quality: 0.8
    });
    const image = base64ToBlob(imageBase64, 'image/jpeg');

    if (!user || !user?.ticket) return;

    try {
      const imageUrl = await TicketService.saveImage({ image });
      setUser({ ...user, ticket: { ...user.ticket, imageUrl } });
      toast.success('Imagen guardada correctamente');
    } catch (error: unknown) {
      if (error instanceof Error && 'response' in error) {
        toast.error('Error al guardar imagen', {
          description: (error as any).response.data.message
        });
      }
    }

    setIsUploadingImg(false);
  };

  const saveImageAndShare = async () => {
    await saveImage();
    shareTicket();
  };

  const updateSub = () => {
    if (!user?.ticket?.id) return;

    TicketService.updateSub()
      .then((ticket) => {
        if (
          user.ticket?.isSub === ticket.isSub &&
          user.ticket?.tier === ticket.tier &&
          user.ticket?.isGift === ticket.isGift
        ) {
          toast.info('No ha habido cambios en tu suscripción');
          return;
        }
        setUser({ ...user, ticket });
        toast.success('Ticket actualizado con suscripción');
      })
      .catch((error: Error) => {
        toast.error('Error al actualizar ticket', { description: error.message });
      });
  };

  useEffect(() => {
    if (user?.ticket?.id) {
      setIsParticipating(true);

      if (!user.ticket.isSub) {
        updateSub();
      }
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center">
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
                  `scrollbars=yes,width=${width},height=${height}`
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
        <div className="flex flex-col items-center gap-10 p-10 text-center">
          <section className="flex w-[60rem] flex-col items-center gap-5">
            <h2 className="text-4xl xl:text-6xl">¡Gracias por participar!</h2>
            {!user?.ticket?.imageUrl && (
              <p className="text-[#F7DFAE]">
                Tendrás más chances de ganar si guardas y compartes tu ticket en redes sociales
              </p>
            )}

            {!user?.ticket?.isSub && (
              <p>
                Puedes suscribirte para tener más chances de ganar!{' '}
                <span
                  onClick={() => {
                    window.open(
                      'https://twitch.tv/subs/coteparrague',
                      '_blank',
                      `scrollbars=yes,width=${width},height=${height}`
                    );
                  }}
                  className="cursor-pointer text-[#F7DFAE] transition-colors duration-200 hover:text-[#F88D3C]"
                >
                  Haz click aquí para suscribirte
                </span>
              </p>
            )}
          </section>

          <motion.div
            key={location.pathname}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <motion.div
              key={location.pathname}
              className="absolute bottom-0 left-0 right-0 top-0 z-0 rounded-lg bg-black p-5 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            />
            <motion.div
              key={location.pathname}
              layout
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.5,
                scale: { type: 'spring', duration: 0.3, delay: 0.5 }
              }}
              style={{
                transformStyle: 'preserve-3d',
                // @ts-expect-error motionvalue can be used as a number
                rotateX,
                // @ts-expect-error motionvalue can be used as a number
                rotateY,
                // @ts-expect-error motionvalue can be used as a number
                scale,
                perspective: '1000px',
                WebkitPerspective: '1000px'
              }}
              className="group relative overflow-hidden rounded-lg"
            >
              <motion.div
                key={location.pathname}
                className="absolute z-10 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-20"
                style={{
                  background: 'radial-gradient(white, #d8bd7255 60%, #fff0 70%)',
                  // @ts-expect-error motionvalue can be used as a number
                  left: sheenX,
                  // @ts-expect-error motionvalue can be used as a number
                  top: sheenY,
                  height: sheenSize,
                  width: sheenSize
                }}
              />

              <div ref={ticketRef} id="ticket">
                <Ticket />
              </div>
            </motion.div>
          </motion.div>

          <section className="mt-10 flex gap-5">
            {!user?.ticket?.isSub && (
              <Button
                bg="#913ddb"
                textColor="white"
                shadow="black"
                borderColor="#7f61ff"
                onClick={updateSub}
                className="flex items-center justify-center gap-2"
              >
                <TwitchLogo size={28} />
                Actualizar Sub en ticket
              </Button>
            )}

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

            <Button
              bg={isUploadingImg ? '#692e9e' : '#913ddb'}
              textColor="white"
              shadow="black"
              borderColor="#7f61ff"
              onClick={saveImageAndShare}
              className="flex items-center justify-center gap-2"
              disabled={isUploadingImg}
            >
              {isUploadingImg ? (
                <CircleNotch size={28} className="animate-spin" />
              ) : (
                <ShareNetwork size={28} />
              )}
              Compartir
            </Button>
          </section>
        </div>
      )}
    </div>
  );
};
