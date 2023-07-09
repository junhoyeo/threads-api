import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <div>
      <header className="flex flex-col gap-5 pt-[64px] pb-12 px-4 items-center rounded-3xl">
        <h1 className="text-6xl font-black tracking-tight text-center">
          Making Threads <br />
          Work in Code
        </h1>
        <p className="text-slate-400">Unofficial, Reverse-Engineered Clients for Threads.</p>
      </header>
    </div>
  );
};

export default HomePage;
