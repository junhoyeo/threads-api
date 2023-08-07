import { BLOKS_VERSION_ID } from '../constants';
import { PrivateQuery, Query, Request, Response } from '../core/request';
import { LATEST_ANDROID_APP_VERSION } from '../dynamic-data';
import { Client } from './visitor';

export declare namespace PrivateClient {
  interface Options extends Client.Options {
    token: string;
    userID: string;
  }
}

type InternalOptions = Client['options'] & {
  token: string;
  userID: string;
};

/**
 * A client that can access private data on behalf of an authenticated user.
 */
export class PrivateClient extends Client {
  declare readonly options: Readonly<InternalOptions>;

  constructor(options: PrivateClient.Options) {
    super(options);
  }

  protected headers(request: Request) {
    const headers = super.headers(request, {
      Authorization: `Bearer IGT:2:${this.options.token}`,
      // Use the Android app's User-Agent when logged in.
      'User-Agent': `Barcelona ${LATEST_ANDROID_APP_VERSION} Android`,
    });

    if (!request.isGraphql()) {
      const igLocale = this.options.locale.replace('-', '_');
      Object.assign(headers, {
        'X-Bloks-Is-Layout-Rtl': 'false',
        'X-Bloks-Version-Id': BLOKS_VERSION_ID,
        'X-Ig-Android-Id': this.options.deviceID,
        'X-Ig-App-Id': '3419628305025917',
        'Accept-Language': this.options.locale,
        'Ig-U-Ds-User-Id': this.options.userID,
        'Ig-Intended-User-Id': this.options.userID,
        'X-Ig-App-Locale': igLocale,
        'X-Ig-Device-Locale': igLocale,
        'X-Ig-Mapped-Locale': igLocale,
      });
    }

    return headers;
  }
}

export interface PrivateClient {
  send<Args extends any[], Data, Error extends object>(
    Query: new (...args: Args) => PrivateQuery<Data, Error> | Query<Data, Error>,
    ...args: Args
  ): Promise<Response<Data, Error>>;
}
