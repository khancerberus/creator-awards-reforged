import { LoginButton } from '@/components/LoginButton';
import { ArrowFatDown } from "@phosphor-icons/react"
import { Card } from 'pixel-retroui';
import '@/assets/css/app.css'

export const App = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-4">
      <h1 className="text-3xl font-bold">Creator Awards 2024</h1>
      <p className="text-xl">Se vienen cosas muy pronto...</p>

      <section className="mt-10 flex gap-4">
        <Card
          className="flex h-[12rem] w-[10rem] flex-col items-center justify-center gap-2"
          bg="black"
          textColor="white"
          shadowColor="#913ddb"
          borderColor="#7f61ff"
          style={{
            filter: 'drop-shadow(0 0 15px #4d3bd9)',
          }}
        >
          <h2 className="text-6xl font-bold">34</h2>
          <p className="text-xl">Días</p>
        </Card>

        <Card
          className="flex w-[10rem] flex-col items-center justify-center gap-2"
          bg="black"
          textColor="white"
          shadowColor="#913ddb"
          borderColor="#7f61ff"
          style={{
            filter: 'drop-shadow(0 0 15px #4d3bd9)',
          }}
        >
          <h2 className="text-6xl font-bold">03</h2>
          <p className="text-xl">Horas</p>
        </Card>

        <Card
          className="flex w-[10rem] flex-col items-center justify-center gap-2"
          bg="black"
          textColor="white"
          shadowColor="#913ddb"
          borderColor="#7f61ff"
          style={{
            filter: 'drop-shadow(0 0 15px #4d3bd9)',
          }}
        >
          <h2 className="text-6xl font-bold">25</h2>
          <p className="text-xl">Minutos</p>
        </Card>

        <Card
          className="flex w-[10rem] flex-col items-center justify-center gap-2"
          bg="black"
          textColor="white"
          shadowColor="#913ddb"
          borderColor="#7f61ff"
          style={{
            filter: 'drop-shadow(0 0 15px #4d3bd9)',
          }}
        >
          <h2 className="text-6xl font-bold">56</h2>
          <p className="text-xl">Segundos</p>
        </Card>
      </section>

      <section className="mt-10 flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl">¿Quieres participar?</h2>
          <p>¡Obtén tu ticket aquí!</p>
        </div>
        <ArrowFatDown size={32} className="float-animation" />
        <LoginButton />
      </section>
    </div>
  );
};
