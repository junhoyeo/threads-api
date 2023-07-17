import { AnalyticsTrackerLogView } from '@/components/AnalyticsTracker';
import { AppRegistryItem } from '@/components/AppRegistryItem';
import { APPS } from '@/data/apps';

export default async function AppDirectory() {
  return (
    <>
      <AnalyticsTrackerLogView event={['view_app_directory', undefined]} />
      <div className="">
        <header className="flex flex-col gap-5 pt-[120px] pb-12 px-4 items-center rounded-3xl">
          <h1 className="text-6xl font-black tracking-tight text-center text-slate-500">Explore Apps</h1>
          <p className="text-2xl text-center text-slate-400">
            Community-Made Apps That Fuels the Text Metaverse.
          </p>
        </header>

        <ul className="flex flex-col w-full max-w-5xl gap-2 px-5 mx-auto">
          {APPS.map((app) => (
            <AppRegistryItem key={app.name} {...app} />
          ))}
        </ul>
      </div>
    </>
  );
}
