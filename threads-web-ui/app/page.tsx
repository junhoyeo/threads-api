import { BookOpen, Star, Zap } from 'lucide-react';

import { Globe } from '@/components/Globe';

import { UnaffiliatedBrands } from '@/components/UnaffiliatedBrands';
import { AmplitudeClient } from 'amplitude-js';
import { Analytics } from '@/lib/analytics';
import { AnalyticsTrackerLogView } from '@/components/AnalyticsTracker';

const getStargazersCount = async (): Promise<number> => {
  try {
    const res = await fetch('https://api.github.com/repos/junhoyeo/threads-api', {
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data.stargazers_count;
  } catch (e) {
    return 1_341;
  }
};

export default async function Home() {
  const stargazersCount = await getStargazersCount();

  return (
    <>
      <AnalyticsTrackerLogView event={['view_landing', undefined]} />
      <div className="z-0 flex flex-col items-center">
        <div className="z-20 flex flex-col items-center">
          <header className="flex flex-col gap-5 pt-[120px] pb-12 px-4 items-center rounded-3xl">
            <h1 className="font-black tracking-tight text-center text-7xl text-slate-500">
              Making Threads <br />
              Work in <span className="text-slate-50">Code</span>
            </h1>
            <p className="text-2xl text-center text-slate-400">
              Threads API — Unofficial, Reverse-Engineered Clients for Threads.
            </p>
          </header>

          <div
            className="bg-[rgba(243,245,247,0.15) w-[200px] h-[200px] rounded-[32px] overflow-hidden"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform',
            }}
          >
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
            <a href="https://github.com/junhoyeo/threads-api/stargazers" target="_blank">
              <span className="absolute flex items-center text-sm gap-1 px-1.5 py-0.5 font-medium bg-yellow-200 rounded-sm text-black/80 -right-4 -bottom-3 hover:scale-110 hover:bg-yellow-300 transition-all">
                <Star className="text-zinc-900 fill-zinc-900" size={14} /> {stargazersCount.toLocaleString()}
              </span>
            </a>
          </div>
          <div className="flex gap-2 mt-5">
            <a href="https://github.com/junhoyeo/threads-api" target="_blank">
              <button className="px-8 py-4 rounded-[16px] bg-black shadow-2xl shadow-slate-600/60 text-slate-300 font-bold">
                View on GitHub
              </button>
            </a>
            <button className="px-8 py-4 rounded-[16px] bg-white shadow-2xl shadow-slate-600/60 text-black font-bold">
              Explore Apps
            </button>
          </div>
        </div>

        <div className="mt-[-200px] mb-[-156px] z-10 opacity-40 relative">
          <Globe />
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b from-black/0 to-[#101010]">
            {/* overlay */}
          </div>
        </div>

        <div className="z-10 flex flex-col items-center w-full">
          <UnaffiliatedBrands />

          <ul className="flex w-full max-w-4xl gap-2 px-5">
            <li className="flex-1 p-4 border rounded-xl bg-zinc-900 border-zinc-800 text-slate-200">
              <BookOpen /> <h3 className="mt-3 text-lg font-medium">Read Data</h3>
            </li>
            <li className="flex-1 p-4 border rounded-xl bg-zinc-900 border-zinc-800 text-slate-200">
              <Zap /> <h3 className="mt-3 text-lg font-medium">Publish Threads</h3>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
