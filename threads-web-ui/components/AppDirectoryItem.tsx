import Image from 'next/image';
import PirateFlagIcon from '@/assets/pirate-flag.png';
import { ExternalLink, Github } from 'lucide-react';

export const AppDirectoryItem: React.FC = () => {
  return (
    <li className="flex p-4 rounded-lg bg-zinc-900">
      <div
        className="w-[100px] h-[100px] flex items-center justify-center rounded-xl relative"
        style={{
          backgroundImage: `url('/assets/gradient.jpg')`,
          backgroundSize: 'cover',
        }}
      >
        <div className="absolute top-0 bottom-0 left-0 right-0 backdrop-sepia" />
        <Image
          src={PirateFlagIcon}
          alt="Pirate Flag"
          width={256}
          height={256}
          className="w-[64px] h-[64px] z-10"
        />
      </div>

      <div className="flex flex-col justify-start flex-1 ml-4">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-medium text-slate-200">Year Progress </h3>
            <a href="https://www.threads.net/@yearprog" target="_blank">
              <code className="h-fit w-fit px-2 py-0.5 text-sm font-normal rounded-md bg-zinc-700 text-slate-300">
                @yearprog
              </code>
            </a>
          </div>
          <div className="flex gap-1.5">
            <a href="https://www.threads.net/@yearprog" target="_blank">
              <button className="flex items-center gap-2 px-2 py-1 font-medium rounded-lg bg-slate-700 text-slate-300">
                <span>Threads</span>
                <ExternalLink size={18} />
              </button>
            </a>
            <a href="https://github.com/SethuSenthil/thread-year-prog-bot" target="_blank">
              <button className="flex items-center gap-2 px-2 py-1 font-medium rounded-lg bg-slate-700 text-slate-300">
                <span>GitHub</span>
                <Github size={18} />
              </button>
            </a>
          </div>
        </div>
        <p className="text-sm text-slate-500">Built by @SethuSenthil</p>
        <p className="mt-2 text-slate-400">
          🤖 Year Progress Bar made by @sethui9 <br />
          🪡Weaving the fabric of ⏳ time, thread by thread 🧵
        </p>
      </div>
    </li>
  );
};
