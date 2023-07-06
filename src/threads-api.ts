import axios from 'axios';
import { Extensions, Thread, ThreadsUser } from './threads-types';

export type GetUserProfileResponse = {
  data: {
    userData: {
      user: ThreadsUser;
    };
  };
  extensions: Extensions;
};

export type GetUserProfileThreadsResponse = {
  data: {
    mediaData: {
      threads: Thread[];
    };
  };
  extensions: Extensions;
};

export class ThreadsAPI {
  constructor() {}

  _getDefaultHeaders = (username: string) => ({
    authority: 'www.threads.net',
    accept: '*/*',
    'accept-language': 'ko',
    'cache-control': 'no-cache',
    origin: 'https://www.threads.net',
    pragma: 'no-cache',
    referer: `https://www.threads.net/@${username}`,
    'x-fb-lsd': 'NjppQDEgONsU_1LCzrmp6q',
    'x-ig-app-id': '238260118697367',
  });

  getUserIDfromUsername = async (username: string): Promise<string | undefined> => {
    const res = await axios.get(`https://www.threads.net/@${username}`, {
      headers: {
        ...this._getDefaultHeaders(username),
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'ko,en;q=0.9,ko-KR;q=0.8,ja;q=0.7',
      },
    });

    // let text: string = (await res.text())
    let text: string = res.data;
    // remove ALL whitespaces from text
    text = text.replace(/\s/g, '');
    // remove all newlines from text
    text = text.replace(/\n/g, '');

    const userId: string | undefined = text.match(/"props":{"user_id":"(\d+)"},/)?.[1];
    return userId;
  };

  getUserProfile = async (username: string, userId: string) => {
    const res = await axios.post<GetUserProfileResponse>(
      'https://www.threads.net/api/graphql',
      new URLSearchParams({
        av: '0',
        __user: '0',
        __a: '1',
        __req: '1',
        __hs: '19544.HYP:barcelona_web_pkg.2.1..0.0',
        dpr: '1',
        __ccg: 'EXCELLENT',
        __rev: '1007795914',
        __s: 'c1fpxh:oh98tm:os2fqi',
        __hsi: '7252655495199472548',
        __dyn:
          '7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE465o-cw5Mx62G3i0Bo7O2l0Fwqo31wnEfovwRwlE-U2zxe2Gew9O22362W2K0zK5o4q0GpovU1aUbodEGdwtU2ewbS1LwTwNwLw8O1pwr82gxC',
        __csr:
          'j8kjt5p9e00hB4Eqw-w0Xiwrk0xE9Eixza2svazUndhEpko9xy7Ej7Saxl2U5-8m8yA4zCwxxWegQz5162a5x02UxW1g2Ex3MwM_3M25wlQ13gN0el4m2H3r16089wxwnq0w8gqd12',
        __comet_req: '29',
        lsd: 'NjppQDEgONsU_1LCzrmp6q',
        jazoest: '21997',
        __spin_r: '1007795914',
        __spin_b: 'trunk',
        __spin_t: '1688640447',
        __jssesw: '2',
        fb_api_caller_class: 'RelayModern',
        fb_api_req_friendly_name: 'BarcelonaProfileRootQuery',
        variables: `{"userID":"${userId}"}`,
        server_timestamps: 'true',
        doc_id: '23996318473300828',
      }),
      {
        headers: {
          ...this._getDefaultHeaders(username),
          'x-fb-friendly-name': 'BarcelonaProfileRootQuery',
        },
      },
    );

    const user = res.data.data.userData.user;
    return user;
  };

  getUserProfileThreads = async (username: string, userId: string) => {
    const res = await axios.post<GetUserProfileThreadsResponse>(
      'https://www.threads.net/api/graphql',
      new URLSearchParams({
        av: '0',
        __user: '0',
        __a: '1',
        __req: '2',
        __hs: '19544.HYP:barcelona_web_pkg.2.1..0.0',
        dpr: '1',
        __ccg: 'EXCELLENT',
        __rev: '1007795914',
        __s: 'c1fpxh:oh98tm:os2fqi',
        __hsi: '7252655495199472548',
        __dyn:
          '7xeUmwlEnwn8K2WnFw9-2i5U4e0yoW3q32360CEbo1nEhw2nVE4W0om78b87C0yE465o-cw5Mx62G3i0Bo7O2l0Fwqo31wnEfovwRwlE-U2zxe2Gew9O22362W2K0zK5o4q0GpovU1aUbodEGdwtU2ewbS1LwTwNwLw8O1pwr82gxC',
        __csr:
          'j8kjt5p9e00hB4Eqw-w0Xiwrk0xE9Eixza2svazUndhEpko9xy7Ej7Saxl2U5-8m8yA4zCwxxWegQz5162a5x02UxW1g2Ex3MwM_3M25wlQ13gN0el4m2H3r16089wxwnq0w8gqd12',
        __comet_req: '29',
        lsd: 'NjppQDEgONsU_1LCzrmp6q',
        jazoest: '21997',
        __spin_r: '1007795914',
        __spin_b: 'trunk',
        __spin_t: '1688640447',
        __jssesw: '2',
        fb_api_caller_class: 'RelayModern',
        fb_api_req_friendly_name: 'BarcelonaProfileThreadsTabQuery',
        variables: `{"userID":"${userId}"}`,
        server_timestamps: 'true',
        doc_id: '6232751443445612',
      }),
      {
        headers: {
          ...this._getDefaultHeaders(username),
          'x-fb-friendly-name': 'BarcelonaProfileThreadsTabQuery',
        },
      },
    );

    const threads = res.data.data.mediaData.threads;
    return threads;
  };
}
