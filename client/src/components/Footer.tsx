import { InstagramLogo, TwitchLogo } from '@phosphor-icons/react';

export const Footer = () => {
  return (
    <footer className="flex h-[20rem] w-full justify-center gap-28 bg-gradient-to-b from-[#101016] to-[#1f1f1f] px-60">
      <section id="social" className="flex flex-col justify-center gap-5">
        <a
          href="https://twitch.tv/coteparrague"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f0dca4] transition-colors duration-200 hover:text-[#F88D3C]"
        >
          <TwitchLogo size={20} className="mr-1 inline-block" />
          Canal Twitch
        </a>

        <a
          href="https://www.instagram.com/cotecreator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#f0dca4] transition-colors duration-200 hover:text-[#F88D3C]"
        >
          <InstagramLogo size={20} className="mr-1 inline-block" />
          Instagram
        </a>
      </section>

      <section id="web-name" className="flex flex-col justify-center">
        <p className="text-[#f0dca4]">Creator Awards 2024</p>
      </section>

      <section id="credits" className="flex flex-col items-center justify-center">
        <p className="text-[#f0dca4]">Web hecha con cariño</p>
        <p className="text-[#f0dca4]">por khancerberus</p>
      </section>
    </footer>
  );
};
