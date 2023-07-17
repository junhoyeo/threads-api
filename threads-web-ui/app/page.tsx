import { BookOpen, Star, Zap } from 'lucide-react';
import { Globe } from '@/components/Globe';
import './globals.css';

const getStargazersCount = async (): Promise<number> => {
  // https://api.github.com/repos/junhoyeo/threads-api
  const res = await fetch('https://api.github.com/repos/junhoyeo/threads-api');
  const data = await res.json();
  return data.stargazers_count;
};

export default async function Home() {
  const stargazersCount = await getStargazersCount();

  return (
    <>
      <div className="z-0 flex flex-col items-center">
        <div className="z-20 flex flex-col items-center">
          <header className="flex flex-col gap-5 pt-[64px] pb-12 px-4 items-center rounded-3xl">
            <h1 className="text-6xl font-black tracking-tight text-center text-slate-500">
              Making Threads <br />
              Work in <span className="text-slate-50">Code</span>
            </h1>
            <p className="text-center text-slate-400">
              Threads API — Unofficial, Reverse-Engineered Clients for Threads.
            </p>
          </header>

          <div className="bg-[rgba(243,245,247,0.15) w-[200px] h-[200px] rounded-[32px] overflow-hidden">
            <div
              className="w-[200px] h-[200px] flex items-center justify-center backdrop-blur-sm"
              style={{
                background:
                  'radial-gradient(circle at 30% 107%, rgba(253, 244, 151, 0.4) 0%, rgba(253, 244, 151, 0.4) 5%, rgba(253, 88, 73, 0.4) 45%,rgba(214, 36, 158, 0.4) 60%,rgba(40, 89, 235, 0.4) 90%)',
              }}
            >
              <img
                className="w-[120px] h-[120px] rounded-[32px]"
                src="https://github.com/junhoyeo/threads-api/raw/main/.github/logo.jpg"
                style={{
                  boxShadow:
                    '0 4px 24px rgba(0, 0, 0, 0.8), -8px 8px 48px rgba(253, 244, 151, 0.65), 12px 12px 48px rgba(214, 36, 158, 0.45)',
                }}
              />
            </div>
          </div>

          <div className="px-6 py-4 -mt-2 rounded-[16px] bg-zinc-900/60 backdrop-blur-sm border border-slate-800/60 shadow-xl shadow-slate-900/20 relative">
            <span className="font-mono font-medium text-slate-400">
              yarn add <span className="text-slate-50">threads-api</span>
            </span>
            <span className="absolute flex items-center text-sm gap-1 px-1.5 py-0.5 font-medium bg-yellow-200 rounded-sm text-black/80 -right-4 -bottom-3">
              <Star className="text-zinc-900 fill-zinc-900" size={14} /> {stargazersCount.toLocaleString()}
            </span>
          </div>
          <button className="mt-3 px-8 py-4 rounded-[16px] bg-black shadow-xl shadow-slate-900/20 text-slate-300">
            View on GitHub
          </button>
        </div>

        <div className="mt-[-200px] mb-[-156px] z-10 opacity-40 relative">
          <Globe />
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black/0 to-[#101010]">
            {/* overlay */}
          </div>
        </div>

        <ul className="z-10 flex w-full max-w-4xl gap-2">
          <li className="flex-1 p-4 border rounded-xl bg-zinc-900 border-zinc-800 text-slate-200">
            <BookOpen /> <h3 className="mt-3 text-lg font-medium">Read Data</h3>
          </li>
          <li className="flex-1 p-4 border rounded-xl bg-zinc-900 border-zinc-800 text-slate-200">
            <Zap /> <h3 className="mt-3 text-lg font-medium">Publish Threads</h3>
          </li>
        </ul>
      </div>
    </>
  );
}
