import { SmileyWink } from '@phosphor-icons/react';

export const VotePage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center pt-[15vh]">
      <section className="flex w-[60rem] flex-col items-center gap-10 text-center">
        <h1 className="text-6xl">Las votaciones aún no están disponibles!</h1>
        <h2 className="text-4xl">Vuelve pronto!</h2>
        <SmileyWink size={64} />
      </section>
    </div>
  );
};
