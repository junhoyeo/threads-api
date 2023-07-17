'use client';

import { Analytics, AnalyticsEvent } from '@/lib/analytics';
import { useEffect, useRef } from 'react';

export const AnalyticsTrackerInit: React.FC = () => {
  Analytics.initialize();
  return <></>;
};

export const AnalyticsTrackerLogView = <TName extends keyof AnalyticsEvent>(props: {
  event: [name: TName, properties: AnalyticsEvent[TName]];
}) => {
  const isLoggedRef = useRef<boolean>(false);

  useEffect(() => {
    if (isLoggedRef.current) {
      return;
    }
    isLoggedRef.current = true;
    Analytics.logEvent(...props.event);
  }, []);
  return <></>;
};
