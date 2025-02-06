import '@/assets/css/ticket.css';
import { useAuth } from '@/hooks/useAuth';

//elegant colors
// #202024
// #d8bd72
export const Ticket = () => {
  const { user } = useAuth();

  return (
    <div className="ticket montserrat-500 relative h-[150px] w-[300px] overflow-hidden rounded-lg border-2 border-[#d8bd72] bg-gradient-to-br from-[#25262b] to-[#101115] p-5">
      <div className="absolute -bottom-5 -left-5 -z-30 w-[200px] rotate-12">
        <img src="/images/spyro.svg" alt="" className="h-full w-full opacity-50" />
      </div>
      <div className="absolute left-5 top-5 text-xl">{'#' + String(user?.ticket?.id).padStart(3, '0')}</div>

      <div className="absolute bottom-5 right-5 text-nowrap text-[#d8bd72cc]">
        Sintoniza en twitch.tv/coteparrague
      </div>
      <div className="absolute right-5 top-5 text-nowrap text-[#d8bd72cc]">Marzo 5 2025</div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <img src="/images/logo-final.png" alt="" width={250} />
      </div>
      <div
        className="h-full w-[2px]"
        style={{
          background: 'linear-gradient(0deg, #0000 10%, #d8bd72 35% 65%, #0000 90%)',
        }}
      ></div>
      <div className="flex h-full w-[25rem] flex-col items-center justify-center">
        <div className="relative h-[80px] w-[80px] overflow-hidden rounded-full border-4 border-[#d8bd72]">
          <img src={user?.profileImageUrl} alt="" />
        </div>
        <p className="text-2xl">{user?.displayName}</p>
        {user?.ticket?.isSub && (
          <p className="rounded-full border border-[#dd88bbdd] px-2 text-sm">Special ticket</p>
        )}
      </div>
      <div
        className="top-50 absolute left-0 -z-20"
        style={{
          boxShadow: '0 0 200px 100px #d8bd72',
        }}
      ></div>
    </div>
  );
};
