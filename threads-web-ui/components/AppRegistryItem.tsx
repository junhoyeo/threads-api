import Image from 'next/image';
import PirateFlagIcon from '@/assets/pirate-flag.png';
import { ExternalLink, Github } from 'lucide-react';
import { AppRegistry } from '@/data/apps';
import { AnalyticsTrackedAnchor } from './AnalyticsTracker';

export const AppRegistryItem: React.FC<AppRegistry> = ({ ...app }) => {
  return (
    <li className="flex p-4 rounded-lg bg-zinc-900">
      {!!app.avatar ? (
        <img
          src={app.avatar}
          alt={app.name}
          className="w-[100px] h-[100px] flex items-center justify-center rounded-xl relative bg-black"
        />
      ) : (
        <div
          className="w-[100px] h-[100px] flex items-center justify-center rounded-xl relative bg-black"
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
            className="w-[64px] h-[64px] z-10"
          />
        </div>
      )}

      <div className="flex flex-col justify-start flex-1 ml-4">
        <div className="flex justify-between w-full">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-medium text-slate-200">{app.name} </h3>
            {!!app.threads_username && (
              <AnalyticsTrackedAnchor
                href={`https://www.threads.net/@${app.threads_username}`}
                target="_blank"
                event={[
                  'click_app_registry_link',
                  { url: `https://www.threads.net/@${app.threads_username}` },
                ]}
              >
                <code className="h-fit w-fit px-2 py-0.5 text-sm font-normal rounded-md bg-zinc-700 text-slate-300">
                  {`@${app.threads_username}`}
                </code>
              </AnalyticsTrackedAnchor>
            )}
          </div>
          <div className="flex gap-1.5">
            {!!app.threads_username && (
              <AnalyticsTrackedAnchor
                href={`https://www.threads.net/@${app.threads_username}`}
                target="_blank"
                event={[
                  'click_app_registry_link',
                  { url: `https://www.threads.net/@${app.threads_username}` },
                ]}
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
        </div>

        {/* author */}
        {'author' in app && !!app.author && (
          <p className="text-sm text-slate-500 line-clamp-2">
            {/* FIXME: */}
            {`Built by ${app.author.name || app.author.github_username}`}
          </p>
        )}
        {'authors' in app && !!app.authors && (
          <p className="text-sm text-slate-500 line-clamp-2">
            {/* FIXME: */}
            {`Built by ${app.authors.map((v) => v.name || v.github_username).join(', ')}`}
          </p>
        )}

        {/* description */}
        <p className="mt-2 text-slate-400 whitespace-break-spaces">{app.description}</p>
      </div>
    </li>
  );
};
