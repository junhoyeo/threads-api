'use client';

import { Analytics, AnalyticsEvent } from '@/lib/analytics';
import Link, { LinkProps } from 'next/link';
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

export const AnalyticsTrackedAnchor = <TName extends keyof AnalyticsEvent>({
  event,
  ...props
}: {
  event: [name: TName, properties: AnalyticsEvent[TName]];
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <a onClick={() => Analytics.logEvent(...event)} {...props} />
);

export const AnalyticsTrackedLink = <TName extends keyof AnalyticsEvent>({
  event,
  ...props
}: {
  event: [name: TName, properties: AnalyticsEvent[TName]];
} & LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Link onClick={() => Analytics.logEvent(...event)} {...props} />
);
