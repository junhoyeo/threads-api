import axios, { AxiosRequestConfig } from 'axios';
import * as fs from 'fs';
import mimeTypes from 'mime-types';
import { v4 as uuidV4 } from 'uuid';
import {
  // DEFAULT_LSD_TOKEN,
  // DEFAULT_DEVICE_ID,
  LOGIN_URL,
  POST_URL,
  POST_WITH_IMAGE_URL,
  POST_HEADERS_DEFAULT,
} from './constants';
import { LATEST_ANDROID_APP_VERSION } from './dynamic-data';
import { Extensions, Thread, ThreadsUser } from './threads-types';

export type AndroidDevice = {
  manufacturer: string;
  model: string;
  os_version: number;
  os_release: string;
};

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
    mediaData?: {
      threads: Thread[];
    };
  };
  extensions: Extensions;
};

export type GetUserProfileRepliesResponse = {
  data: {
    mediaData?: {
      threads: Thread[];
    };
  };
  extensions: Extensions;
};

export type GetUserProfileThreadResponse = {
  data: {
    data: {
      containing_thread: Thread;
      reply_threads?: Thread[];
    };
  };
  extensions: Extensions;
};

export type GetThreadLikersResponse = {
  data: {
    likers: {
      users: ThreadsUser[];
    };
  };
  extensions: Extensions;
};

export type ThreadsAPIOptions = {
  fbLSDToken?: string;
  deviceID?: string;
  verbose?: boolean;
  noUpdateLSD?: boolean;
  httpAgent?: AxiosRequestConfig['httpAgent'];
  username?: string;
  password?: string;
  device?: AndroidDevice;
};

export const DEFAULT_LSD_TOKEN = 'NjppQDEgONsU_1LCzrmp6q';
export const DEFAULT_DEVICE_ID = `android-${(Math.random() * 1e24).toString(36)}`;
export const DEFAULT_DEVICE: AndroidDevice = {
  manufacturer: 'OnePlus',
  model: 'ONEPLUS+A3010',
  os_version: 25,
  os_release: '7.1.1',
};

export class ThreadsAPI {
  fbLSDToken: string = DEFAULT_LSD_TOKEN;
  deviceID: string = DEFAULT_DEVICE_ID;
  verbose: boolean = false;
  noUpdateLSD: boolean = false;
  httpAgent?: AxiosRequestConfig['httpAgent'];
  username?: string;
  password?: string;
  device?: AndroidDevice = DEFAULT_DEVICE;

  constructor(options?: ThreadsAPIOptions) {
    if (options?.fbLSDToken) this.fbLSDToken = options.fbLSDToken;
    if (options?.deviceID) this.deviceID = options.deviceID;
    if (options?.noUpdateLSD) this.noUpdateLSD = options.noUpdateLSD;
    this.verbose = options?.verbose || false;
    this.httpAgent = options?.httpAgent;
    this.username = options?.username;
    this.password = options?.password;
    this.device = options?.device;
  }

  _getDefaultHeaders = (username?: string) => ({
    authority: 'www.threads.net',
    accept: '*/*',
    'accept-language': 'ko',
    'cache-control': 'no-cache',
    origin: 'https://www.threads.net',
    pragma: 'no-cache',
    ...(!!username ? { referer: `https://www.threads.net/@${username}` } : undefined),
    'x-asbd-id': '129477',
    'x-fb-lsd': this.fbLSDToken,
    'x-ig-app-id': '238260118697367',
  });

  _isValidUrl = async (url: string): Promise<boolean> => {
    const urlPattern: RegExp =
      /^(https?:\/\/)?((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)+[a-zA-Z]{2,})(\/?|\/[-a-zA-Z0-9_%+.~!@#$^&*(){}[\]|\/\\<>]*)$/;

    if (urlPattern.test(url)) {
      try {
        const response = await axios.head(url);
        return response.status === 200;
      } catch (error) {
        return false;
      }
    }

    return false;
  };

  _download = async (url: string): Promise<Buffer | null> => {
    try {
      const response = await axios.get(url, { responseType: 'text' });
      if (response.status === 200) {
        return Buffer.from(response.data, 'binary');
      } else {
        console.error('[ERROR] fail to file load');
        return null;
      }
    } catch (error) {
      console.error('[ERROR] fail to file load:', error);
      return null;
    }
  };

  getUserIDfromUsername = async (
    username: string,
    options?: AxiosRequestConfig,
  ): Promise<string | undefined> => {
    const res = await axios.get(`https://www.instagram.com/${username}`, {
      ...options,
      httpAgent: this.httpAgent,
      headers: {
        ...this._getDefaultHeaders(username),
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'ko,en;q=0.9,ko-KR;q=0.8,ja;q=0.7',
        pragma: 'no-cache',
        referer: 'https://www.instagram.com/',
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': `navigate`,
        'sec-fetch-site': `cross-site`,
        'sec-fetch-user': `?1`,
        'upgrade-insecure-requests': `1`,
        'x-asbd-id': undefined,
        'x-fb-lsd': undefined,
        'x-ig-app-id': undefined,
      },
    });

    // let text: string = (await res.text())
    let text: string = res.data;
    // remove ALL whitespaces from text
    text = text.replace(/\s/g, '');
    // remove all newlines from text
    text = text.replace(/\n/g, '');

    const userID: string | undefined = text.match(/"user_id":"(\d+)",/)?.[1];
    const lsdToken: string | undefined = text.match(/"LSD",\[\],{"token":"(\w+)"},\d+\]/)?.[1];

    if (!this.noUpdateLSD && !!lsdToken) {
      this.fbLSDToken = lsdToken;
      if (this.verbose) {
        console.debug('[fbLSDToken] UPDATED', this.fbLSDToken);
      }
    }

    return userID;
  };

  getUserProfile = async (username: string, userID: string, options?: AxiosRequestConfig) => {
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }

    const res = await axios.post<GetUserProfileResponse>(
      'https://www.threads.net/api/graphql',
      new URLSearchParams({
        lsd: this.fbLSDToken,
        variables: `{"userID":"${userID}"}`,
        doc_id: '23996318473300828',
      }),
      {
        ...options,
        httpAgent: this.httpAgent,
        headers: {
          ...this._getDefaultHeaders(username),
          'x-fb-friendly-name': 'BarcelonaProfileRootQuery',
        },
      },
    );

    const user = res.data.data.userData.user;
    return user;
  };

  getUserProfileThreads = async (username: string, userID: string, options?: AxiosRequestConfig) => {
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }

    const res = await axios.post<GetUserProfileThreadsResponse>(
      'https://www.threads.net/api/graphql',
      new URLSearchParams({
        lsd: this.fbLSDToken,
        variables: `{"userID":"${userID}"}`,
        doc_id: '6232751443445612',
      }),
      {
        ...options,
        httpAgent: this.httpAgent,
        headers: {
          ...this._getDefaultHeaders(username),
          'x-fb-friendly-name': 'BarcelonaProfileThreadsTabQuery',
        },
      },
    );

    const threads = res.data.data?.mediaData?.threads || [];
    return threads;
  };

  getUserProfileReplies = async (username: string, userID: string, options?: AxiosRequestConfig) => {
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }

    const res = await axios.post<GetUserProfileThreadsResponse>(
      'https://www.threads.net/api/graphql',
      new URLSearchParams({
        lsd: this.fbLSDToken,
        variables: `{"userID":"${userID}"}`,
        doc_id: '6684830921547925',
      }),
      {
        ...options,
        httpAgent: this.httpAgent,
        headers: {
          ...this._getDefaultHeaders(username),
          'x-fb-friendly-name': 'BarcelonaProfileRepliesTabQuery',
        },
      },
    );

    const threads = res.data.data?.mediaData?.threads || [];
    return threads;
  };

  getPostIDfromThreadID = async (
    threadID: string,
    options?: AxiosRequestConfig,
  ): Promise<string | undefined> => {
    threadID = threadID.split('?')[0];
    threadID = threadID.replace(/\s/g, '');
    threadID = threadID.replace(/\//g, '');
    const postURL = `https://www.threads.net/t/${threadID}`;
    return this.getPostIDfromURL(postURL, options);
  };

  getPostIDfromURL = async (postURL: string, options?: AxiosRequestConfig): Promise<string | undefined> => {
    const res = await axios.get(postURL, {
      ...options,
      httpAgent: this.httpAgent,
    });

    let text: string = res.data;
    text = text.replace(/\s/g, '');
    text = text.replace(/\n/g, '');

    const postID: string | undefined = text.match(/{"post_id":"(.*?)"}/)?.[1];
    const lsdToken: string | undefined = text.match(/"LSD",\[\],{"token":"(\w+)"},\d+\]/)?.[1];

    if (!this.noUpdateLSD && !!lsdToken) {
      this.fbLSDToken = lsdToken;
      if (this.verbose) {
        console.debug('[fbLSDToken] UPDATED', this.fbLSDToken);
      }
    }

    return postID;
  };

  getThreads = async (postID: string, options?: AxiosRequestConfig) => {
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }
    const res = await axios.post<GetUserProfileThreadResponse>(
      'https://www.threads.net/api/graphql',
      new URLSearchParams({
        lsd: this.fbLSDToken,
        variables: `{"postID":"${postID}"}`,
        doc_id: '5587632691339264',
      }),
      {
        ...options,
        httpAgent: this.httpAgent,
        headers: {
          ...this._getDefaultHeaders(),
          'x-fb-friendly-name': 'BarcelonaPostPageQuery',
        },
      },
    );
    const thread = res.data.data.data;
    return thread;
  };

  getThreadLikers = async (postID: string, options?: AxiosRequestConfig) => {
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }
    const res = await axios.post<GetThreadLikersResponse>(
      'https://www.threads.net/api/graphql',
      new URLSearchParams({
        lsd: this.fbLSDToken,
        variables: `{"mediaID":"${postID}"}`,
        doc_id: '9360915773983802',
      }),
      {
        ...options,
        httpAgent: this.httpAgent,
        headers: {
          ...this._getDefaultHeaders(),
        },
      },
    );
    const likers = res.data.data.likers;
    return likers;
  };

  getToken = async (): Promise<string | undefined> => {
    if (!this.username || !this.password) {
      return;
    }

    const base = 'https://i.instagram.com/api/v1/';
    const url = `${base}bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/`;
    const blockVersion = '5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73';

    const params = encodeURIComponent(
      JSON.stringify({
        client_input_params: {
          password: this.password,
          contact_point: this.username,
          device_id: `${this.deviceID}`,
        },
        server_params: {
          credential_type: 'password',
          device_id: `${this.deviceID}`,
        },
      }),
    );

    const bkClientContext = encodeURIComponent(
      JSON.stringify({
        bloks_version: blockVersion,
        styles_id: 'instagram',
      }),
    );
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      headers: {
        'User-Agent': `Barcelona ${LATEST_ANDROID_APP_VERSION} Android`,
        'Sec-Fetch-Site': 'same-origin',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      responseType: 'text',
      data: `params=${params}&bk_client_context=${bkClientContext}&bloks_versioning_id=${blockVersion}`,
    };

    const { data } = await axios(url, requestConfig);

    let pos = data.split('Bearer IGT:2:')[1];
    if (pos.length > 1) {
      pos = pos.split('=')[0];

      const token = pos + '==';
      if (this.verbose) {
        console.debug('[token]', token);
      }
      return token;
    }
    return;
  };

  publish = async (caption: string): Promise<boolean> => {
    if (!this.username || !this.password) {
      return false;
    }

    const userID = await this.getUserIDfromUsername(this.username);
    if (!userID) {
      return false;
    }

    const token = await this.getToken();
    if (!token) {
      return false;
    }

    const base = 'https://i.instagram.com';
    const url = `${base}/api/v1/media/configure_text_only_post/`;
    const now = new Date();
    const timezoneOffset = -now.getTimezoneOffset() * 60;

    const data = encodeURIComponent(
      JSON.stringify({
        publish_mode: 'text_post',
        text_post_app_info: '{"reply_control":0}',
        timezone_offset: timezoneOffset.toString(),
        source_type: '4',
        _uid: userID,
        device_id: `${this.deviceID}`,
        caption,
        upload_id: now.getTime(),
        device: this.device,
      }),
    );
    // const headers = POST_HEADERS_DEFAULT;
    // headers['Authorization'] = `Bearer IGT:2:${token}`;
    // try {
    //   const res = await axios.post(POST_URL, `signed_body=SIGNATURE.${data}`, {
    //     httpAgent: this.httpAgent,
    //     headers: headers,
    //     timeout: 60 * 1000,
    //   });
    //   if (res.data && res.data.status === 'ok') {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // } catch (e) {
    //   return false;

    await axios(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer IGT:2:${token}`,
        'User-Agent': 'Barcelona 289.0.0.77.109 Android',
        'Sec-Fetch-Site': 'same-origin',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data: `signed_body=SIGNATURE.${data}`,
    });
    return true;
  };

  publishWithImage = async (caption: string, imagePath: string): Promise<boolean> => {
    if (!this.username || !this.password) {
      return false;
    }

    const userID = await this.getUserIDfromUsername(this.username);
    if (!userID) {
      return false;
    }

    const token = await this.getToken();
    if (!token) {
      return false;
    }

    let imageContent = null;
    if (!(fs.existsSync(imagePath) && fs.statSync(imagePath).isFile())) {
      if (!this._isValidUrl(imagePath)) {
        return false;
      } else {
        imageContent = await this._download(imagePath);
      }
    }
    const headers = POST_HEADERS_DEFAULT;
    headers['Authorization'] = `Bearer IGT:2:${token}`;
    const content = await this.uploadImage(headers, imagePath, imageContent);
    if (content != null) {
      try {
        const contentItem = JSON.parse(content as string);
        const upload_id = contentItem.upload_id;
        const params = JSON.stringify({
          text_post_app_info: '{"reply_control":0}',
          scene_capture_type: '',
          timezone_offset: '-25200',
          source_type: '4',
          _uid: userID,
          device_id: this.deviceID,
          caption: caption,
          upload_id: upload_id,
          device: {
            manufacturer: 'OnePlus',
            model: 'ONEPLUS+A3010',
            android_version: 25,
            android_release: '7.1.1',
          },
        });
        const payload = `signed_body=SIGNATURE.${params}`;
        const res = await axios.post(POST_WITH_IMAGE_URL, payload, {
          httpAgent: this.httpAgent,
          headers: headers,
          timeout: 60 * 1000,
        });
        const postResult = res.data;
        if ('status' in postResult && postResult['status'] === 'ok') {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    } else {
      return false;
    }
  };

  uploadImage = async (
    headers: any,
    imagePath: string,
    imageContent: Buffer | null,
  ): Promise<String | null> => {
    const uploadId: number = Math.floor(Date.now());
    const name: string = `${uploadId}_0_${Math.floor(
      Math.random() * (9999999999 - 1000000000 + 1) + 1000000000,
    )}`;
    const url: string = 'https://www.instagram.com/rupload_igphoto/' + name;

    let content: Buffer;
    let mime_type: string | null;
    if (imageContent === null) {
      const f = await fs.promises.open(imagePath, 'rb');
      content = await f.readFile();
      await f.close();

      const mimeTypeResult = mimeTypes.lookup(imagePath);
      mime_type = mimeTypeResult ? mimeTypeResult : 'application/octet-stream';
    } else {
      content = imageContent;
      const response = await axios.head(imagePath);
      const contentType = response.headers['content-type'];
      if (!contentType) {
        if (url.split('/').length > 0) {
          const fileName = url.split('/').pop();
          mime_type = mimeTypes.lookup(fileName as string) || 'application/octet-stream';
        }
      }
    }

    const x_instagram_rupload_params = {
      upload_id: uploadId,
      media_type: '1',
      sticker_burnin_params: '[]',
      image_compression: JSON.stringify({ lib_name: 'moz', lib_version: '3.1.m', quality: '80' }),
      xsharing_user_ids: '[]',
      retry_context: {
        num_step_auto_retry: '0',
        num_reupload: '0',
        num_step_manual_retry: '0',
      },
      'IG-FB-Xpost-entry-point-v2': 'feed',
    };

    const contentLength = content.length;
    const imageHeaders: any = {
      'User-Agent': headers['User-Agent'],
      'Content-Type': 'application/octet-stream',
      'Sec-Fetch-Site': headers['Sec-Fetch-Site'],
      Authorization: headers['Authorization'],
      X_FB_PHOTO_WATERFALL_ID: uuidV4(),
      'X-Entity-Type': mime_type!! !== undefined ? `image/${mime_type!!}` : 'image/jpeg',
      Offset: '0',
      'X-Instagram-Rupload-Params': JSON.stringify(x_instagram_rupload_params),
      'X-Entity-Name': name,
      'X-Entity-Length': contentLength,
      'Content-Length': contentLength,
      'Accept-Encoding': 'gzip',
    };

    try {
      const response = await axios.post(url, content, {
        httpAgent: this.httpAgent,
        headers: imageHeaders,
        timeout: 60 * 1000,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };
}
