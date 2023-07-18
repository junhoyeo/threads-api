const isBrowser = typeof window !== 'undefined';

export type AnalyticsEvent = {
  view_landing: undefined;
  view_app_registry: undefined;
  click_landing_link: {
    title: string;
    url: string;
    medium?: 'home_header' | string;
  };
  click_app_registry_link: {
    url: string;
  };
};

const AMPLITUDE_API_KEY = '322828ad7d1ac7b6e46bde1db17063b4';
const getEnvironment = () => {
  if (!isBrowser) {
    return '';
  }
  return window.location.host.includes('localhost')
    ? 'debug'
    : window.location.host.includes('junho.io')
    ? 'production'
    : 'development';
};

async function getAmplitude() {
  if (isBrowser) {
    const amplitude = await import('amplitude-js');
    return amplitude.default.getInstance();
  }
  return undefined;
}

declare global {
  interface Window {
    initialized: boolean;
  }
}

async function initialize() {
  if (!isBrowser) {
    return;
  }
  if (window.initialized) {
    return;
  }
  window.initialized = true;
  const amplitude = await getAmplitude();
  amplitude?.init(AMPLITUDE_API_KEY);
  const ENVIRONMENT = getEnvironment();
  amplitude?.setUserProperties({
    is_debug: ENVIRONMENT !== 'production',
  });
  console.log(`[Analytics] Initialized (${ENVIRONMENT})`);
}

async function logEvent<TName extends keyof AnalyticsEvent>(name: TName, properties: AnalyticsEvent[TName]) {
  if (!isBrowser) {
    return;
  }
  if (!window.initialized) {
    await initialize();
  }
  const eventProperties = {
    referrer: document.referrer || undefined,
    ...(properties as unknown as object),
  };
  const ENVIRONMENT = getEnvironment();
  if (ENVIRONMENT !== 'production') {
    console.log('[Analytics]', name, eventProperties);
  }
  const amplitude = await getAmplitude();
  amplitude?.logEvent(name, eventProperties);
}

export const Analytics = {
  getAmplitude,
  initialize,
  logEvent,
};
