import { Query, Request } from '../core/request';
import { defaultLocale, defaultTimeZoneName, defaultTimeZoneOffset } from '../core/timezone';
import { AndroidDevice } from '../types/public';

export declare namespace Client {
  interface Options {
    device?: AndroidDevice;
    deviceID?: string;
    fbLSDToken?: string;
    locale?: string;
    timeZoneOffset?: string;
    timeZoneName?: string;
    userAgent?: string;
  }
}

type InternalOptions = Client.Options & {
  device: AndroidDevice;
  deviceID: string;
  fbLSDToken: string;
  locale: string;
  timeZoneOffset: string;
  timeZoneName: string;
  userAgent: string;
};

/**
 * A client that can access public data anonymously.
 */
export class Client {
  readonly options: Readonly<InternalOptions>;

  constructor({ ...options }: Client.Options = {}) {
    options.device ||= {
      manufacturer: 'OnePlus',
      model: 'ONEPLUS+A3010',
      os_version: 25,
      os_release: '7.1.1',
    };
    options.deviceID ||= `android-${(Math.random() * 1e24).toString(36)}`;
    options.fbLSDToken ||= 'NjppQDEgONsU_1LCzrmp6q';
    options.locale ||= defaultLocale;
    options.timeZoneOffset ||= defaultTimeZoneOffset;
    options.timeZoneName ||= defaultTimeZoneName;
    options.userAgent ||=
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36';

    this.options = options as InternalOptions;
  }

  protected headers(request: Request, overrides?: Record<string, string>): Record<string, string> {
    return {
      'User-Agent': this.options.userAgent,
      ...request.headers,
      ...overrides,
    };
  }

  send<Args extends any[], Data, Error extends Request.Error>(
    Query: new (...args: Args) => Query<Data, Error>,
    ...args: Args
  ) {
    return new Query(...args).send(this);
  }
}
