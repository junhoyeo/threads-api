'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const ITEMS = [
  { title: 'About', url: '/' },
  { title: 'App Registry', url: '/apps' },
];

export const NavigationBar: React.FC = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(ITEMS[0].url);

  const left = useMemo(() => {
    const item = ITEMS.find((item) => item.url === selected) || ITEMS[0];
    return ITEMS.indexOf(item) * 160;
  }, [selected]);

  return (
    <div className="bg-[rgba(16,16,16,0.3)] border-b border-b-zinc-800 backdrop-blur-md h-[72px] fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-2">
      <div className="relative flex h-full mx-auto border rounded-lg bg-zinc-900 w-fit border-slate-100/5 ">
        {/* indicator */}
        <div className="w-[160px] top-0 absolute h-full p-1.5 -z-0 transition-all" style={{ left }}>
          <div
            className="w-full h-full bg-white rounded-lg"
            style={{
              background: `linear-gradient(to right, #fffafe, #feffe4, #fbeeff, #e8fdff, #ffeff8, #edf8ff)`,
            }}
          ></div>
        </div>
        {ITEMS.map((item) => (
          <span
            key={item.url}
            className={clsx(
              'w-[160px] flex items-center justify-center z-10 font-medium cursor-pointer',
              selected !== item.url ? 'text-slate-400' : 'text-slate-900',
            )}
            onClick={() => {
              setSelected(item.url);
              router.push(item.url);
            }}
          >
            {item.title}
          </span>
        ))}
      </div>
    </div>
  );
};
