import axios, { AxiosRequestConfig } from 'axios';
import mimeTypes from 'mrmime';
import { v4 as uuidV4 } from 'uuid';
import {
  POST_URL,
  POST_WITH_IMAGE_URL,
  DEFAULT_LSD_TOKEN,
  DEFAULT_DEVICE_ID,
  LOGIN_URL,
  BASE_API_URL,
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

export type InstagramImageUploadResponse = {
  upload_id: string;
  xsharing_nonces: {};
  status: 'ok';
};

export type FriendshipStatusResponse = {
  friendship_status: {
    following: boolean;
    followed_by: boolean;
    blocking: boolean;
    muting: boolean;
    is_private: boolean;
    incoming_request: boolean;
    outgoing_request: boolean;
    text_post_app_pre_following: boolean;
    is_bestie: boolean;
    is_restricted: boolean;
    is_feed_favorite: boolean;
    is_eligible_to_subscribe: boolean;
  };
  status: 'ok';
};

export type ThreadsAPIOptions = {
  verbose?: boolean;
  token?: string;
  fbLSDToken?: string;

  noUpdateToken?: boolean;
  noUpdateLSD?: boolean;

  httpAgent?: AxiosRequestConfig['httpAgent'];
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  username?: string;
  password?: string;
  deviceID?: string;
  device?: AndroidDevice;
  userID?: string;
};

export type ThreadsAPIPublishOptions =
  | {
      text?: string;
      parentPostID?: string;
    } & ({ url?: string } | { image?: string });

export const DEFAULT_DEVICE: AndroidDevice = {
  manufacturer: 'OnePlus',
  model: 'ONEPLUS+A3010',
  os_version: 25,
  os_release: '7.1.1',
};

export class ThreadsAPI {
  verbose: boolean = false;
  token?: string = undefined;
  fbLSDToken: string = DEFAULT_LSD_TOKEN;

  noUpdateToken: boolean = false;
  noUpdateLSD: boolean = false;

  httpAgent?: AxiosRequestConfig['httpAgent'];
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  username?: string;
  password?: string;
  deviceID: string = DEFAULT_DEVICE_ID;
  device?: AndroidDevice = DEFAULT_DEVICE;

  userID: string | undefined = undefined;

  constructor(options?: ThreadsAPIOptions) {
    if (options?.token) this.token = options.token;
    if (options?.fbLSDToken) this.fbLSDToken = options.fbLSDToken;

    this.noUpdateToken = !!options?.noUpdateToken;
    this.noUpdateLSD = !!options?.noUpdateLSD;

    this.verbose = options?.verbose || false;
    this.httpAgent = options?.httpAgent;
    this.httpsAgent = options?.httpsAgent;

    this.username = options?.username;
    this.password = options?.password;

    if (options?.deviceID) this.deviceID = options.deviceID;
    this.device = options?.device;
    this.userID = options?.userID;
  }

  _getAppHeaders = () => ({
    'User-Agent': `Barcelona ${LATEST_ANDROID_APP_VERSION} Android`,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    ...(this.token ? { Authorization: `Bearer IGT:2:${this.token}` } : undefined),
  });

  _getDefaultHeaders = (username?: string) => ({
    ...this._getAppHeaders(),
    authority: 'www.threads.net',
    accept: '*/*',
    'accept-language': 'ko',
    'cache-control': 'no-cache',
    origin: 'https://www.threads.net',
    pragma: 'no-cache',
    'Sec-Fetch-Site': 'same-origin',
    'x-asbd-id': '129477',
    'x-fb-lsd': this.fbLSDToken,
    'x-ig-app-id': '238260118697367',
    ...(!!username ? { referer: `https://www.threads.net/@${username}` } : undefined),
  });

  getProfilePage = async (url: string, username: string, options?: AxiosRequestConfig) => {
    const res = await axios.get(`${url}${username}`, {
      ...options,
      httpAgent: this.httpAgent,
      httpsAgent: this.httpsAgent,
      headers: {
        ...this._getDefaultHeaders(username),
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'ko,en;q=0.9,ko-KR;q=0.8,ja;q=0.7',
        Authorization: undefined,
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

    return text;
  };

  getUserIDfromUsernameWithInstagram = async (
    username: string,
    options?: AxiosRequestConfig,
  ): Promise<string | undefined> => {
    const text = await this.getProfilePage('https://www.instagram.com/', username, options);

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

  getUserIDfromUsername = async (
    username: string,
    options?: AxiosRequestConfig,
  ): Promise<string | undefined> => {
    const text = await this.getProfilePage('https://www.threads.net/@', username, options);

    const userID: string | undefined = text.match(/"user_id":"(\d+)"/)?.[1];
    const lsdToken: string | undefined = text.match(/"LSD",\[\],{"token":"(\w+)"},\d+\]/)?.[1];

    if (!userID) {
      return this.getUserIDfromUsernameWithInstagram(username, options);
    }

    if (!this.noUpdateLSD && !!lsdToken) {
      this.fbLSDToken = lsdToken;
      if (this.verbose) {
        console.debug('[fbLSDToken] UPDATED', this.fbLSDToken);
      }
    }

    return userID;
  };
  getCurrentUserID = async (options?: AxiosRequestConfig) => {
    if (this.userID) {
      if (this.verbose) {
        console.debug('[userID] USING', this.userID);
      }
      return this.userID;
    }
    if (!this.username) {
      throw new Error('username is not defined');
    }
    this.userID = await this.getUserIDfromUsername(this.username, options);
    if (this.verbose) {
      console.debug('[userID] UPDATED', this.userID);
    }
    return this.userID;
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
        httpsAgent: this.httpsAgent,
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
        httpsAgent: this.httpsAgent,
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
        httpsAgent: this.httpsAgent,
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
      httpsAgent: this.httpsAgent,
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
        httpsAgent: this.httpsAgent,
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
        httpsAgent: this.httpsAgent,
        headers: this._getDefaultHeaders(),
      },
    );
    const likers = res.data.data.likers;
    return likers;
  };

  _toggleAuthPostRequest = async <T extends any>(url: string, options?: AxiosRequestConfig) => {
    const token = await this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const res = await axios.post<T>(url, undefined, {
      ...options,
      httpAgent: this.httpAgent,
      httpsAgent: this.httpsAgent,
      headers: this._getDefaultHeaders(),
    });
    return res;
  };
  like = async (postID: string, options?: AxiosRequestConfig) => {
    const userID = await this.getCurrentUserID();
    const res = await this._toggleAuthPostRequest<{ status: 'ok' | string }>(
      `${BASE_API_URL}/media/${postID}_${userID}/like/`,
      options,
    );
    return res.data.status === 'ok';
  };
  unlike = async (postID: string, options?: AxiosRequestConfig) => {
    const userID = await this.getCurrentUserID();
    const res = await this._toggleAuthPostRequest<{ status: 'ok' | string }>(
      `${BASE_API_URL}/media/${postID}_${userID}/unlike/`,
      options,
    );
    return res.data.status === 'ok';
  };
  follow = async (userID: string, options?: AxiosRequestConfig) => {
    const res = await this._toggleAuthPostRequest<FriendshipStatusResponse>(
      `${BASE_API_URL}/friendships/create/${userID}/`,
      options,
    );
    if (this.verbose) {
      console.debug('[FOLLOW]', res.data);
    }
    return res.data;
  };
  unfollow = async (userID: string, options?: AxiosRequestConfig) => {
    const res = await this._toggleAuthPostRequest<FriendshipStatusResponse>(
      `${BASE_API_URL}/friendships/destroy/${userID}/`,
      options,
    );
    if (this.verbose) {
      console.debug('[UNFOLLOW]', res.data);
    }
    return res.data;
  };

  getToken = async (): Promise<string | undefined> => {
    if (this.token) {
      if (this.verbose) {
        console.debug('[token] USING', this.token);
      }
      return this.token;
    }

    if (!this.username || !this.password) {
      throw new Error('Username and password are required');
    }

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

    const blockVersion = '5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73';
    const bkClientContext = encodeURIComponent(
      JSON.stringify({
        bloks_version: blockVersion,
        styles_id: 'instagram',
      }),
    );
    const requestConfig: AxiosRequestConfig = {
      method: 'POST',
      headers: this._getAppHeaders(),
      responseType: 'text',
      data: `params=${params}&bk_client_context=${bkClientContext}&bloks_versioning_id=${blockVersion}`,
    };

    const { data } = await axios<string>(LOGIN_URL, requestConfig);
    const token = data.split('Bearer IGT:2:')[1].split('"')[0].replaceAll('\\', '');
    if (!this.noUpdateToken) {
      if (this.verbose) {
        console.debug('[token] UPDATED', token);
      }
      this.token = token;
    }
    return token;
  };

  publish = async (rawOptions: ThreadsAPIPublishOptions | string): Promise<string | undefined> => {
    const options: ThreadsAPIPublishOptions =
      typeof rawOptions === 'string' ? { text: rawOptions } : rawOptions;
    if (!this.username || !this.password) {
      throw new Error('Username or password not set');
    }

    const userID = await this.getCurrentUserID();
    if (!userID) {
      throw new Error('User ID not found');
    }

    const token = await this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    const now = new Date();
    const timezoneOffset = -now.getTimezoneOffset() * 60;

    let data: any = {
      text_post_app_info: { reply_control: 0 },
      timezone_offset: timezoneOffset.toString(),
      source_type: '4',
      _uid: userID,
      device_id: this.deviceID,
      caption: options.text || '',
      upload_id: now.getTime(),
      device: this.device,
    };
    let url = POST_URL;

    if ('image' in options && !!options.image) {
      url = POST_WITH_IMAGE_URL;
      const { upload_id: uploadId } = await this.uploadImage(options.image);
      data.upload_id = uploadId;
      data.scene_capture_type = '';
    } else if ('url' in options && !!options.url) {
      data.text_post_app_info.link_attachment_url = options.url;
    }

    if (!!options.parentPostID) {
      data.text_post_app_info.reply_id = options.parentPostID;
    }
    if (!(options as any).image) {
      data.publish_mode = 'text_post';
    }

    const payload = `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(data))}`;
    const res = await axios.post(url, payload, {
      httpAgent: this.httpAgent,
      httpsAgent: this.httpsAgent,
      headers: this._getAppHeaders(),
      timeout: 60 * 1000,
    });

    if (this.verbose) {
      console.debug('[PUBLISH]', res.data);
    }

    if (res.data['status'] === 'ok') {
      return res.data['media']['id'];
    }

    return undefined;
  };

  delete = async (postID: string, options?: AxiosRequestConfig): Promise<boolean> => {
    const url = `${BASE_API_URL}/media/${postID}/delete/`;
    const data = {
      media_id: postID,
      _uid: this.userID,
      _uuid: this.deviceID,
    };
    const payload = `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(data))}`;

    const res = await axios.post(url, payload, {
      httpAgent: this.httpAgent,
      httpsAgent: this.httpsAgent,
      headers: this._getAppHeaders(),
      timeout: 60 * 1000,
      ...options,
    });
    if (res.data['status'] === 'ok') {
      return true;
    }
    return false;
  };

  /**
   * @deprecated: use `publish` instead
   **/
  publishWithImage = async (caption: string, imagePath: string): Promise<string | undefined> => {
    return this.publish({ text: caption, image: imagePath });
  };

  uploadImage = async (imagePath: string): Promise<InstagramImageUploadResponse> => {
    const uploadId = Date.now().toString();
    const name = `${uploadId}_0_${Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000)}`;
    const url: string = `https://www.instagram.com/rupload_igphoto/${name}`;

    let content: Buffer;
    let mime_type: string | null;

    const isFilePath = !imagePath.startsWith('http');
    if (isFilePath) {
      const fs = await import('fs');
      content = await fs.promises.readFile(imagePath);
      const mimeTypeResult = mimeTypes.lookup(imagePath);
      mime_type = mimeTypeResult ? mimeTypeResult : 'application/octet-stream';
    } else {
      const response = await axios.get(imagePath, { responseType: 'arraybuffer' });
      content = Buffer.from(response.data, 'binary');
      mime_type = response.headers['content-type'];
    }

    const x_instagram_rupload_params = {
      upload_id: uploadId,
      media_type: '1',
      sticker_burnin_params: JSON.stringify([]),
      image_compression: JSON.stringify({ lib_name: 'moz', lib_version: '3.1.m', quality: '80' }),
      xsharing_user_ids: JSON.stringify([]),
      retry_context: JSON.stringify({
        num_step_auto_retry: '0',
        num_reupload: '0',
        num_step_manual_retry: '0',
      }),
      'IG-FB-Xpost-entry-point-v2': 'feed',
    };

    const contentLength = content.length;
    const imageHeaders: any = {
      ...this._getDefaultHeaders(),
      'Content-Type': 'application/octet-stream',
      X_FB_PHOTO_WATERFALL_ID: uuidV4(),
      'X-Entity-Type': mime_type!! !== undefined ? `image/${mime_type!!}` : 'image/jpeg',
      Offset: '0',
      'X-Instagram-Rupload-Params': JSON.stringify(x_instagram_rupload_params),
      'X-Entity-Name': name,
      'X-Entity-Length': contentLength.toString(),
      'Content-Length': contentLength.toString(),
      'Accept-Encoding': 'gzip',
    };

    if (this.verbose) {
      console.log(`[UPLOAD_IMAGE] Uploading ${contentLength.toLocaleString()}b as ${uploadId}...`);
    }

    try {
      const { data } = await axios.post<InstagramImageUploadResponse>(url, content, {
        httpAgent: this.httpAgent,
        headers: imageHeaders,
        timeout: 60 * 1000,
      });
      if (this.verbose) {
        console.log(`[UPLOAD_IMAGE] SUCCESS`, data);
      }
      return data;
    } catch (error: any) {
      if (this.verbose) {
        console.log(`[UPLOAD_IMAGE] FAILED`, error.response.data);
      }
      throw error;
    }
  };
}
