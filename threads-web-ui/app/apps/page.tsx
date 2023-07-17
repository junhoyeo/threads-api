import { AnalyticsTrackerLogView } from '@/components/AnalyticsTracker';

export default async function AppDirectory() {
  return (
    <>
      <AnalyticsTrackerLogView event={['view_app_directory', undefined]} />
    </>
  );
}
