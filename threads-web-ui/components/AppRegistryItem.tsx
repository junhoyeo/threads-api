import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

import PirateFlagIcon from '@/assets/pirate-flag.png';
import RobotIcon from '@/assets/robot.png';

import { AppRegistry } from '@/data/apps';

import { AnalyticsTrackedAnchor } from './AnalyticsTracker';
import { Twemoji, TwemojiCleanup } from './Twemoji';

export const AppRegistryItem: React.FC<AppRegistry> = ({ ...app }) => {
  const isBot = app.tags?.includes('bot') || false;

  return (
    <li className="flex p-4 border rounded-lg bg-zinc-900 border-zinc-700/40">
      <span className="hidden md:block">
        <Avatar isBot={isBot} {...app} />
      </span>

      <div className="flex flex-col justify-start flex-1 md:ml-4 md:max-w-[calc(100%_-_116px)]">
        <div className="flex md:flex-col">
          <span className="block md:hidden">
            <Avatar isBot={isBot} {...app} />
          </span>

          <div className="flex flex-col ml-3 md:ml-0">
            <div className="flex justify-between w-full">
              <h3 className="flex-1 text-xl font-medium md:truncate text-slate-200">{app.name}</h3>
              <span className="hidden md:block">
                <Links {...app} />
              </span>
            </div>

            <div className="flex flex-col gap-1 mt-1 text-xs sm:gap-2 sm:items-center sm:flex-row sm:text-sm">
              {!!app.threads_username && (
                <AnalyticsTrackedAnchor
                  href={`https://www.threads.net/@${app.threads_username}`}
                  target="_blank"
                  event={[
                    'click_app_registry_link',
                    { url: `https://www.threads.net/@${app.threads_username}` },
                  ]}
                >
                  <code className="h-fit w-fit px-2 py-0.5 font-normal rounded-md bg-zinc-700 text-slate-300">
                    {`@${app.threads_username}`}
                  </code>
                </AnalyticsTrackedAnchor>
              )}

              {/* author */}
              {'author' in app && !!app.author && (
                <p className="text-slate-500 line-clamp-2 sm:mt-0.5">
                  {/* FIXME: */}
                  {`Built by ${app.author.name || app.author.github_username}`}
                </p>
              )}
              {'authors' in app && !!app.authors && (
                <p className="text-slate-500 line-clamp-2 sm:mt-0.5">
                  {/* FIXME: */}
                  {`Built by ${app.authors.map((v) => v.name || v.github_username).join(', ')}`}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* description */}
        <div className="mt-2 text-slate-400 whitespace-break-spaces">
          <span className="hidden twemoji-server">{app.description}</span>
          <Twemoji content={app.description} />
        </div>

        <TwemojiCleanup />

        <span className="block mt-4 md:hidden">
          <Links {...app} />
        </span>
      </div>
    </li>
  );
};

const Avatar: React.FC<AppRegistry & { isBot: boolean }> = ({ isBot, ...app }) => {
  return (
    <div className="w-[56px] min-w-[56px] h-[56px] md:w-[100px] md:min-w-[100px] md:h-[100px] relative rounded-[13px] border border-zinc-600/60">
      {!!app.avatar ? (
        <img
          src={app.avatar}
          alt={app.name}
          className="relative flex items-center justify-center w-full h-full bg-black rounded-xl"
        />
      ) : (
        <div
          className="relative flex items-center justify-center w-full h-full bg-black rounded-xl"
          style={{
            backgroundImage: `url('/assets/mesh-gradient.png')`,
            backgroundSize: 'cover',
          }}
        >
          <Image
            src={PirateFlagIcon}
            alt="Pirate Flag"
            width={256}
            height={256}
            className="w-[24px] h-[24px] md:w-[64px] md:h-[64px] z-10"
          />
        </div>
      )}

      {isBot && (
        <div
          className="h-[36px] w-[36px] md:w-[42px] md:h-[42px] absolute -top-6 -left-6 md:-bottom-5 md:-left-5 rounded-full flex items-center justify-center border border-teal-500/60"
          style={{
            background: `radial-gradient(88.68% 88.68% at 33.22% 15.42%, #B6FFF3 0%, #4DFCFF)`,
            boxShadow: `-4px 4px 32px rgba(121, 233, 235, 0.4)`,
          }}
        >
          <Image
            className="h-[20px] w-[20px] md:w-[24px] md:h-[24px]"
            src={RobotIcon}
            alt="Robot"
            style={{ filter: `drop-shadow(0px 2px 8px rgba(0, 10, 255, 0.33))` }}
          />
        </div>
      )}
    </div>
  );
};

const Links: React.FC<AppRegistry> = ({ ...app }) => (
  <div className="flex gap-1.5">
    {!!app.threads_username && (
      <AnalyticsTrackedAnchor
        href={`https://www.threads.net/@${app.threads_username}`}
        target="_blank"
        event={['click_app_registry_link', { url: `https://www.threads.net/@${app.threads_username}` }]}
      >
        <button className="flex items-center gap-2 px-2 py-1 font-medium rounded-lg bg-slate-700 text-slate-300">
          <span>Threads</span>
          <ExternalLink size={18} />
        </button>
      </AnalyticsTrackedAnchor>
    )}

    {!!app.url && (
      <AnalyticsTrackedAnchor
        href={app.url}
        target="_blank"
        event={['click_app_registry_link', { url: app.url! }]}
      >
        <button className="flex items-center gap-2 px-2 py-1 font-medium rounded-lg bg-slate-700 text-slate-300">
          <span>App</span>
          <ExternalLink size={18} />
        </button>
      </AnalyticsTrackedAnchor>
    )}

    {!!app.repository && (
      <AnalyticsTrackedAnchor
        href={app.repository}
        target="_blank"
        event={['click_app_registry_link', { url: app.repository! }]}
      >
        <button className="flex items-center gap-2 px-2 py-1 font-medium rounded-lg bg-slate-700 text-slate-300">
          <span>GitHub</span>
          <Github size={18} />
        </button>
      </AnalyticsTrackedAnchor>
    )}
  </div>
);
