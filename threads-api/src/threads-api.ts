import axios, { AxiosRequestConfig } from 'axios';
import * as crypto from 'crypto';
import * as mimeTypes from 'mrmime';
import { v4 as uuidv4 } from 'uuid';

import {
  // BASE_API_URL,
  // BASE_FOLLOW_PARAMS,
  // BLOKS_VERSION,
  // DEFAULT_LSD_TOKEN,
  // FOLLOW_NAV_CHAIN,
  // IG_APP_ID,
  // LOGIN_EXPERIMENTS,
  // POST_URL,
  // POST_WITH_IMAGE_URL,
  // POST_WITH_SIDECAR_URL,
  REPLY_CONTROL_OPTIONS,
} from './constants';
import { LATEST_ANDROID_APP_VERSION } from './dynamic-data';
// import { ThreadsAPIError } from './error';
// import { AndroidDevice, Extensions, Story, Thread, ThreadsUser } from './threads-types';
import { StrictUnion } from './types/utils';

const BASE_API_URL = 'https://i.instagram.com';

const generateDeviceID = () => {
  const deviceID = `android-${(Math.random() * 1e24).toString(36)}`;
  console.warn(
    `⚠️ WARNING: deviceID not provided, automatically generating device id '${deviceID}'`,
    'Please save this device id and use it for future uses to prevent login issues.',
    'You can provide this device id by passing it to the constructor or setting the THREADS_DEVICE_ID environment variable (.env file)',
  );
  return deviceID;
};

type ThreadsUser = any;
type Thread = any;
type Extensions = any;
type Story = any;

export type ErrorResponse = {
  status: 'error'; // ?
  error_title: string;
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
export type GetUserProfileThreadsPaginatedResponse = {
  status: 'ok';
  next_max_id?: string;
  medias: [];
  threads: Thread[];
};

export type GetUserProfileLoggedInResponse = {
  users: ThreadsUser[];
  status: 'ok';
};

export type GetUserProfileFollowPaginatedResponse = {
  status: 'ok';
  users: ThreadsUser[];
  big_list: boolean; // seems to be false when next_max_id === undefined
  page_size: number;
  next_max_id?: string;
  // has_more: boolean; this prop is confusing & always is false. use next_max_id === undefined for end of list
  should_limit_list_of_followers: boolean;
};

export type GetThreadRepliesPaginatedResponse = {
  containing_thread: Thread;
  reply_threads: Thread[];
  subling_threads: Thread[];
  paging_tokens: {
    downward: string;
  };
  downwards_thread_will_continue: boolean;
  target_post_reply_placeholder: string;
  status: 'ok';
};

export type GetNotificationsOptions = {
  feed_type: string;
  mark_as_seen: boolean;
  timezone_offset: number;
  timezone_name: string;
  selected_filters?: ThreadsAPI.NotificationFilter;
  max_id?: string;
  pagination_first_record_timestamp?: number;
};

export interface GetNotificationsPagination {
  maxID?: string;
  firstRecordTimestamp?: number;
}

export type GetNotificationsPaginatedResponse = {
  counts: {
    [key: string]: any;
  };
  last_checked: number;
  new_stories: Story[];
  old_stories: Story[];
  continuation_token: number;
  subscription: any;
  is_last_page: boolean;
  next_max_id: string;
  auto_load_more_enabled: boolean;
  pagination_first_record_timestamp: number;
  filters: any[];
  status: 'ok';
};

export type GetRecommendedUsersPaginatedResponse = {
  users: ThreadsUser[];
  paging_token: string;
  has_more: boolean;
  status: 'ok';
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

export type GetTimelineResponse = {
  num_results: number;
  more_available: boolean;
  auto_load_more_enabled: boolean;
  is_direct_v2_enabled: boolean;
  next_max_id: string;
  view_state_version: string;
  client_feed_changelist_applied: boolean;
  request_id: string;
  pull_to_refresh_window_ms: number;
  preload_distance: number;
  status: string;
  pagination_source: string;
  hide_like_and_view_counts: number;
  is_shell_response: boolean;
  items: Thread[];
  feed_items_media_info: Array<any>;
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

export const DEFAULT_DEVICE = {
  manufacturer: 'OnePlus',
  model: 'ONEPLUS+A3010',
  os_version: 25,
  os_release: '7.1.1',
};

export declare namespace ThreadsAPI {
  type Options = {
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
    device?: any;
    userID?: string;
    locale?: string;
    maxRetries?: number;
  };

  type ExternalImage = {
    path: string;
  };

  type RawImage = {
    type: string;
    data: Buffer;
  };

  type Image = string | ExternalImage | RawImage;

  type ImageAttachment = {
    image: Image;
  };

  type SidecarAttachment = {
    sidecar: Image[];
  };

  type LinkAttachment = {
    url: string;
  };

  type PostAttachment = StrictUnion<ImageAttachment | SidecarAttachment | LinkAttachment>;

  type PostReplyControl = keyof typeof REPLY_CONTROL_OPTIONS;

  enum NotificationFilter {
    MENTIONS = 'text_post_app_mentions',
    REPLIES = 'text_post_app_replies',
    VERIFIED = 'verified',
  }

  type PublishOptions = {
    text?: string;
    replyControl?: PostReplyControl;
    parentPostID?: string;
    quotedPostID?: string;
    attachment?: PostAttachment;
    /** @deprecated Use `attachment.url` instead. */
    url?: string;
    /** @deprecated Use `attachment.image` instead. */
    image?: Image;
  };
}

interface UserIDQuerier<T extends any> {
  (userID: string, options?: AxiosRequestConfig): Promise<T>;

  // deprecated
  (username: string, userID: string, options?: AxiosRequestConfig): Promise<T>;
}

interface UserProfileQuerier<T extends any> {
  (userID: string, options?: AxiosRequestConfig): Promise<T>;
}

interface PaginationUserIDQuerier<T extends any> {
  (userID: string, maxID?: string, options?: AxiosRequestConfig): Promise<T>;
}

interface PaginationRepliesQuerier<T extends any> {
  (postID: string, maxID?: string, options?: AxiosRequestConfig): Promise<T>;
}

interface PaginationNotificationsQuerier<T extends any> {
  (
    filter?: ThreadsAPI.NotificationFilter,
    pagination?: GetNotificationsPagination,
    config?: AxiosRequestConfig,
  ): Promise<T>;
}

interface PaginationRecommendedQuerier<T extends any> {
  (maxID?: string, config?: AxiosRequestConfig): Promise<T>;
}

interface SearchQuerier<T extends any> {
  (query: string, count?: number, options?: AxiosRequestConfig): Promise<T>;
}

export type SearchUsersResponse = {
  num_results: number;
  users: ThreadsUser[];
  has_more: boolean;
  rank_token: string;
  status: 'ok';
};

export type PaginationAndSearchOptions = {
  maxID?: string;
  query?: string;
};

interface PaginationAndSearchUserIDQuerier<T extends any> {
  (userID: string, params?: PaginationAndSearchOptions, options?: AxiosRequestConfig): Promise<T>;
}

export class ThreadsAPI {
  verbose: boolean;
  token?: string;
  fbLSDToken: string;

  noUpdateToken: boolean;
  noUpdateLSD: boolean;

  httpAgent?: AxiosRequestConfig['httpAgent'];
  httpsAgent?: AxiosRequestConfig['httpsAgent'];

  username?: string;
  password?: string;
  deviceID: string;
  device: any;
  userID?: string;
  locale: string;
  maxRetries: number;

  constructor(options: ThreadsAPI.Options = {}) {
    this.verbose = !!options.verbose;
    this.token = options.token;
    this.fbLSDToken = options.fbLSDToken ?? '';

    this.noUpdateToken = !!options.noUpdateToken;
    this.noUpdateLSD = !!options.noUpdateLSD;

    this.httpAgent = options.httpAgent;
    this.httpsAgent = options.httpsAgent;

    this.username = options.username ?? process.env.THREADS_USERNAME;
    this.password = options.password ?? process.env.THREADS_PASSWORD;
    this.deviceID = (options.deviceID ?? process.env.THREADS_DEVICE_ID) || generateDeviceID();
    this.device = options.device ?? DEFAULT_DEVICE;
    this.userID = options.userID;
    this.locale = options.locale ?? Intl.DateTimeFormat().resolvedOptions().locale;
    this.maxRetries = options.maxRetries ?? 1;
  }

  sign(payload: object | string) {
    const json = typeof payload === 'object' ? JSON.stringify(payload) : payload;
    const signature = crypto
      .createHmac('sha256', '9193488027538fd3450b83b7d05286d4ca9599a0f7eeed90d8c85925698a05dc')
      .update(json)
      .digest('hex');
    return {
      ig_sig_key_version: 4,
      signed_body: `${signature}.${json}`,
    };
  }

  syncLoginExperiments = async () => {
    const uid = uuidv4();
    const LOGIN_EXPERIMENTS =
      'ig_android_fci_onboarding_friend_search,ig_android_device_detection_info_upload,ig_android_account_linking_upsell_universe,ig_android_direct_main_tab_universe_v2,ig_android_allow_account_switch_once_media_upload_finish_universe,ig_android_sign_in_help_only_one_account_family_universe,ig_android_sms_retriever_backtest_universe,ig_android_direct_add_direct_to_android_native_photo_share_sheet,ig_android_spatial_account_switch_universe,ig_growth_android_profile_pic_prefill_with_fb_pic_2,ig_account_identity_logged_out_signals_global_holdout_universe,ig_android_prefill_main_account_username_on_login_screen_universe,ig_android_login_identifier_fuzzy_match,ig_android_mas_remove_close_friends_entrypoint,ig_android_shared_email_reg_universe,ig_android_video_render_codec_low_memory_gc,ig_android_custom_transitions_universe,ig_android_push_fcm,multiple_account_recovery_universe,ig_android_show_login_info_reminder_universe,ig_android_email_fuzzy_matching_universe,ig_android_one_tap_aymh_redesign_universe,ig_android_direct_send_like_from_notification,ig_android_suma_landing_page,ig_android_prefetch_debug_dialog,ig_android_smartlock_hints_universe,ig_android_black_out,ig_activation_global_discretionary_sms_holdout,ig_android_video_ffmpegutil_pts_fix,ig_android_multi_tap_login_new,ig_save_smartlock_universe,ig_android_caption_typeahead_fix_on_o_universe,ig_android_enable_keyboardlistener_redesign,ig_android_sign_in_password_visibility_universe,ig_android_nux_add_email_device,ig_android_direct_remove_view_mode_stickiness_universe,ig_android_hide_contacts_list_in_nux,ig_android_new_users_one_tap_holdout_universe,ig_android_ingestion_video_support_hevc_decoding,ig_android_mas_notification_badging_universe,ig_android_secondary_account_in_main_reg_flow_universe,ig_android_secondary_account_creation_universe,ig_android_account_recovery_auto_login,ig_android_pwd_encrytpion,ig_android_bottom_sheet_keyboard_leaks,ig_android_sim_info_upload,ig_android_mobile_http_flow_device_universe,ig_android_hide_fb_button_when_not_installed_universe,ig_android_account_linking_on_concurrent_user_session_infra_universe,ig_android_targeted_one_tap_upsell_universe,ig_android_gmail_oauth_in_reg,ig_android_account_linking_flow_shorten_universe,ig_android_vc_interop_use_test_igid_universe,ig_android_notification_unpack_universe,ig_android_registration_confirmation_code_universe,ig_android_device_based_country_verification,ig_android_log_suggested_users_cache_on_error,ig_android_reg_modularization_universe,ig_android_device_verification_separate_endpoint,ig_android_universe_noticiation_channels,ig_android_account_linking_universe,ig_android_hsite_prefill_new_carrier,ig_android_one_login_toast_universe,ig_android_retry_create_account_universe,ig_android_family_apps_user_values_provider_universe,ig_android_reg_nux_headers_cleanup_universe,ig_android_mas_ui_polish_universe,ig_android_device_info_foreground_reporting,ig_android_shortcuts_2019,ig_android_device_verification_fb_signup,ig_android_onetaplogin_optimization,ig_android_passwordless_account_password_creation_universe,ig_android_black_out_toggle_universe,ig_video_debug_overlay,ig_android_ask_for_permissions_on_reg,ig_assisted_login_universe,ig_android_security_intent_switchoff,ig_android_device_info_job_based_reporting,ig_android_add_account_button_in_profile_mas_universe,ig_android_add_dialog_when_delinking_from_child_account_universe,ig_android_passwordless_auth,ig_radio_button_universe_2,ig_android_direct_main_tab_account_switch,ig_android_recovery_one_tap_holdout_universe,ig_android_modularized_dynamic_nux_universe,ig_android_fb_account_linking_sampling_freq_universe,ig_android_fix_sms_read_lollipop,ig_android_access_flow_prefil';
    const data = {
      id: uid,
      experiments: LOGIN_EXPERIMENTS,
    };
    try {
      const res = await axios.post(`${BASE_API_URL}/api/v1/qe/sync/`, this.sign(data), {
        httpAgent: this.httpAgent,
        httpsAgent: this.httpsAgent,
        headers: {
          ...this._getAppHeaders(),
          Authorization: undefined,
          'Sec-Fetch-Site': 'same-origin',
          'X-DEVICE-ID': uid,
        },
      });
      return res;
    } catch (error: any) {
      if (this.verbose) {
        console.log('[SYNC LOGIN EXPERIMENT FAILED]', error.response.data);
      }
      throw new Error('Sync login experiment failed');
    }
  };

  encryptPassword = async (password: string, now = Date.now()) => {
    // https://github.com/dilame/instagram-private-api/blob/master/src/repositories/account.repository.ts#L79
    const randKey = crypto.randomBytes(32);
    const iv = crypto.randomBytes(12);
    const { headers } = await this.syncLoginExperiments();

    if (this.verbose) {
      console.log('[SYNC LOGIN EXPERIMENT HEADERS]', JSON.stringify(headers));
    }

    const passwordEncryptionKeyID: number | undefined = headers['ig-set-password-encryption-key-id'];
    const passwordEncryptionPubKey: string | undefined = headers['ig-set-password-encryption-pub-key'];

    console.log({
      passwordEncryptionKeyID,
    });

    const rsaEncrypted = crypto.publicEncrypt(
      {
        key: Buffer.from(passwordEncryptionPubKey || '', 'base64').toString(),
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      randKey,
    );
    const cipher = crypto.createCipheriv('aes-256-gcm', randKey, iv);
    const time = Math.floor(now / 1000).toString();
    cipher.setAAD(Buffer.from(time));

    const aesEncrypted = Buffer.concat([cipher.update(password, 'utf8'), cipher.final()]);
    const sizeBuffer = Buffer.alloc(2, 0);
    sizeBuffer.writeInt16LE(rsaEncrypted.byteLength, 0);

    const authTag = cipher.getAuthTag();
    return {
      time,
      password: Buffer.concat([
        Buffer.from([1, passwordEncryptionKeyID || 0]),
        iv,
        sizeBuffer,
        rsaEncrypted,
        authTag,
        aesEncrypted,
      ]).toString('base64'),
    };
  };

  login = async () => {
    let retries = 0;

    const _login = async () => {
      if (this.verbose) {
        console.log('[LOGIN] Logging in...');
      }
      const encryptedPassword = await this.encryptPassword(this.password!);

      const params = encodeURIComponent(
        JSON.stringify({
          client_input_params: {
            password: `#PWD_INSTAGRAM:4:${encryptedPassword.time}:${encryptedPassword.password}`,
            contact_point: this.username,
            device_id: this.deviceID,
          },
          server_params: {
            credential_type: 'password',
            device_id: this.deviceID,
          },
        }),
      );

      const BLOKS_VERSION = '5f56efad68e1edec7801f630b5c122704ec5378adbee6609a448f105f34a9c73';
      const bkClientContext = encodeURIComponent(
        JSON.stringify({
          bloks_version: BLOKS_VERSION,
          styles_id: 'instagram',
        }),
      );
      const requestConfig: AxiosRequestConfig = {
        httpAgent: this.httpAgent,
        httpsAgent: this.httpsAgent,
        method: 'POST',
        headers: this._getAppHeaders(),
        responseType: 'text',
        data: `params=${params}&bk_client_context=${bkClientContext}&bloks_versioning_id=${BLOKS_VERSION}`,
      };

      console.log({
        url: `${BASE_API_URL}/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/`,
        ...requestConfig,
      });

      let { data } = await axios<string>(
        `${BASE_API_URL}/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/`,
        requestConfig,
      );

      data = JSON.stringify(data.replaceAll('\\', ''));

      if (this.verbose) {
        console.log('[LOGIN] Cleaned output', data);
      }

      try {
        const token = data.split('Bearer IGT:2:')[1].split('"')[0].replaceAll('\\', '');
        const userID = data.match(/pk_id(.{18})/)?.[1].replaceAll(/[\\":]/g, '');

        if (!this.noUpdateToken) {
          if (this.verbose) {
            console.debug('[token] UPDATED', token);
          }
          this.token = token;
        }

        this.userID = userID;
        if (this.verbose) {
          console.debug('[userID] UPDATED', this.userID);
        }

        return { token, userID };
      } catch (error) {
        if (this.verbose) {
          console.error('[LOGIN] Failed to login', error);
        }
        throw new Error('Login Failed');
      }
    };

    // try to login maxRetries times
    while (retries < this.maxRetries!) {
      try {
        return _login();
      } catch (error) {
        if (this.verbose) {
          console.error(`[LOGIN] Failed to login, retrying... (${retries + 1}/${this.maxRetries})`);
        }
        const delay = Math.pow(2, retries) * 1000; // exponential backoff with base 2
        await new Promise((resolve) => setTimeout(resolve, delay));
        retries++;
      }
    }

    throw new Error(`[LOGIN] Failed to login after ${this.maxRetries} retries`);
  };

  _getUnAuthenticatedHeaders = () => ({
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.199 Safari/537.36',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  });

  _getDefaultUserDataHeaders = (username?: string) => ({
    ...this._getUnAuthenticatedHeaders(),
    Host: 'www.threads.net',
    Accept: '*/*',
    'Accept-Language': this.locale,
    'cache-control': 'no-cache',
    Origin: 'https://www.threads.net',
    Pragma: 'no-cache',
    'Sec-Fetch-Site': 'same-origin',
    'X-Asbd-id': '129477',
    'X-FB-Friendly-Name': 'BarcelonaProfileRootQuery',
    'X-FB-Lsd': this.fbLSDToken,
    'X-Ig-App-Id': '238260118697367',
    ...(!!username ? { Referer: `https://www.threads.net/@${username}` } : undefined),
  });

  _getAppHeaders = () => ({
    'User-Agent': `Barcelona ${LATEST_ANDROID_APP_VERSION} Android`,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    ...(this.token && { Authorization: `Bearer IGT:2:${this.token}` }),
  });

  _getInstaHeaders = () => ({
    ...this._getAppHeaders(),
    'X-Bloks-Is-Layout-Rtl': 'false',
    'X-Bloks-Version-Id': '',
    'X-Ig-Android-Id': this.deviceID,
    'X-Ig-App-Id': '',
    'Accept-Language': this.locale || 'en-US',
    ...(this.userID && { 'Ig-U-Ds-User-Id': this.userID, 'Ig-Intended-User-Id': this.userID }),
    ...(this.locale && {
      // strangely different from normal locale
      'X-Ig-App-Locale': this.locale.replace('-', '_'),
      'X-Ig-Device-Locale': this.locale.replace('-', '_'),
      'X-Ig-Mapped-Locale': this.locale.replace('-', '_'),
    }),
  });

  _getDefaultHeaders = (username?: string) => ({
    ...this._getAppHeaders(),
    authority: 'www.threads.net',
    accept: '*/*',
    'accept-language': this.locale,
    'cache-control': 'no-cache',
    origin: 'https://www.threads.net',
    pragma: 'no-cache',
    'Sec-Fetch-Site': 'same-origin',
    'x-asbd-id': '129477',
    'x-fb-lsd': this.fbLSDToken,
    'x-ig-app-id': '238260118697367',
    ...(!!username ? { referer: `https://www.threads.net/@${username}` } : undefined),
  });

  _getCleanedProfileHTML = async (url: string, username: string, options?: AxiosRequestConfig) => {
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
    const text = await this._getCleanedProfileHTML('https://www.instagram.com/', username, options);

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
    const text = await this._getCleanedProfileHTML('https://www.threads.net/@', username, options);

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
    try {
      this.userID = await this.getUserIDfromUsername(this.username, options);
      if (this.verbose) {
        console.debug('[userID] UPDATED', this.userID);
      }
      return this.userID;
    } catch (e) {
      if (this.verbose) {
        console.error('[userID] Failed to fetch userID, Fallbacking to login', e);
      }
      const { userID } = await this.login();
      return userID;
    }
  };

  _requestQuery = <T extends any>(
    url: string,
    data: Record<string, string | undefined>,
    options?: AxiosRequestConfig,
  ) => {
    Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
    return axios.post<T>(url, new URLSearchParams(data as Record<string, string>), {
      httpAgent: this.httpAgent,
      httpsAgent: this.httpsAgent,
      headers: this._getDefaultHeaders(),
      ...options,
    });
  };

  _requestUserDataQuery = <T extends any>(
    url: string,
    data: Record<string, string | undefined>,
    options?: AxiosRequestConfig,
  ) => {
    Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
    return axios.post<T>(url, new URLSearchParams(data as Record<string, string>), {
      httpAgent: this.httpAgent,
      httpsAgent: this.httpsAgent,
      headers: this._getDefaultUserDataHeaders(),
      ...options,
    });
  };

  _destructureFromUserIDQuerier = (params: any) => {
    const typedParams = params as
      | [string]
      | [string, AxiosRequestConfig | undefined]
      | [string, string] // old
      | [string, string, AxiosRequestConfig | undefined]; // old
    let userID: string;
    let options: AxiosRequestConfig | undefined;
    if (typeof typedParams[0] === 'string' && typeof typedParams[1] === 'string') {
      // old
      // username = typedParams[0]
      userID = typedParams[1];
      options = typedParams[2];
    } else {
      userID = typedParams[0];
      options = typedParams[1] as AxiosRequestConfig | undefined;
    }
    return { userID, options };
  };

  getUserProfile: UserIDQuerier<ThreadsUser> = async (...params) => {
    const { userID, options } = this._destructureFromUserIDQuerier(params);
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }

    const res = await this._requestUserDataQuery<GetUserProfileResponse>(
      'https://www.threads.net/api/graphql',
      {
        lsd: this.fbLSDToken,
        variables: JSON.stringify({ userID }),
        doc_id: '23996318473300828',
      },
      options,
    );
    const user = res.data.data.userData.user;
    return user;
  };

  getUserProfileLoggedIn: UserProfileQuerier<GetUserProfileLoggedInResponse> = async (
    userID,
    options = {},
  ): Promise<GetUserProfileLoggedInResponse> => {
    let data: GetUserProfileLoggedInResponse | ErrorResponse | undefined = undefined;
    try {
      const res = await this._fetchAuthGetRequest<GetUserProfileLoggedInResponse>(
        `${BASE_API_URL}/api/v1/users/${userID}/info?is_prefetch=false&entry_point=profile&from_module=ProfileViewModel`,
        options,
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[USER PROFILE] Failed to fetch', data);
      }
      throw new Error('Failed to fetch user profile: ' + JSON.stringify(data));
    }
    return data;
  };

  getUserProfileThreads: UserIDQuerier<Thread[]> = async (...params) => {
    const { userID, options } = this._destructureFromUserIDQuerier(params);
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }

    const res = await this._requestUserDataQuery<GetUserProfileThreadsResponse>(
      'https://www.threads.net/api/graphql',
      {
        lsd: this.fbLSDToken,
        variables: JSON.stringify({ userID }),
        doc_id: '6232751443445612',
      },
      options,
    );
    const threads = res.data.data?.mediaData?.threads || [];
    return threads;
  };

  getUserProfileThreadsLoggedIn: PaginationUserIDQuerier<GetUserProfileThreadsPaginatedResponse> = async (
    userID,
    maxID = '',
    options = {},
  ): Promise<GetUserProfileThreadsPaginatedResponse> => {
    let data: GetUserProfileThreadsPaginatedResponse | ErrorResponse | undefined = undefined;
    try {
      const res = await this._fetchAuthGetRequest<GetUserProfileThreadsPaginatedResponse>(
        `${BASE_API_URL}/api/v1/text_feed/${userID}/profile/${maxID ? `?max_id=${maxID}` : ''}`,
        options,
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[USER THREADS] Failed to fetch', data);
      }
      throw new Error('Failed to fetch user threads: ' + JSON.stringify(data));
    }
    return data;
  };

  //NOTE: REFERER URL FOR REPLIES IS DIFFERENT WHEN NOT LOGGED IN
  _getDefaultRepliesHeaders = (username?: string) => ({
    ...this._getUnAuthenticatedHeaders(),
    Host: 'www.threads.net',
    Accept: '*/*',
    'Accept-Language': this.locale,
    'cache-control': 'no-cache',
    Origin: 'https://www.threads.net',
    Pragma: 'no-cache',
    'Sec-Fetch-Site': 'same-origin',
    'X-Asbd-id': '129477',
    'X-FB-Friendly-Name': 'BarcelonaProfileProfileRepliesTabQuery',
    'X-FB-Lsd': this.fbLSDToken,
    'X-Ig-App-Id': '238260118697367',
    ...(!!username ? { Referer: `https://www.threads.net/@${username}/replies` } : undefined),
  });

  _requestRepliesQuery = <T extends any>(
    url: string,
    data: Record<string, string | undefined>,
    options?: AxiosRequestConfig,
  ) => {
    Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
    return axios.post<T>(url, new URLSearchParams(data as Record<string, string>), {
      httpAgent: this.httpAgent,
      httpsAgent: this.httpsAgent,
      headers: this._getDefaultRepliesHeaders(),
      ...options,
    });
  };

  getUserProfileReplies: UserIDQuerier<Thread[]> = async (...params) => {
    const { userID, options } = this._destructureFromUserIDQuerier(params);
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }

    const res = await this._requestRepliesQuery<GetUserProfileThreadsResponse>(
      'https://www.threads.net/api/graphql',
      {
        lsd: this.fbLSDToken,
        variables: JSON.stringify({ userID }),
        doc_id: '6684830921547925',
      },
      options,
    );
    const mediaData = res.data.data.mediaData;

    // Manually assert the type of threads to ensure TypeScript recognizes it correctly
    const threads = (mediaData?.threads || []) as Thread[];
    return threads;
  };

  getUserProfileRepliesLoggedIn: PaginationUserIDQuerier<GetUserProfileThreadsPaginatedResponse> = async (
    userID,
    maxID = '',
    options = {},
  ): Promise<GetUserProfileThreadsPaginatedResponse> => {
    if (!this.token) {
      await this.getToken();
    }
    if (!this.token) {
      throw new Error('Token not found');
    }

    let data: GetUserProfileThreadsPaginatedResponse | ErrorResponse | undefined = undefined;
    try {
      const res = await this._fetchAuthGetRequest<GetUserProfileThreadsPaginatedResponse | ErrorResponse>(
        `${BASE_API_URL}/api/v1/text_feed/${userID}/profile/replies/${maxID ? `?max_id=${maxID}` : ''}`,
        options,
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[USER REPLIES] Failed to fetch', data);
      }
      throw new Error('Failed to fetch user replies: ' + JSON.stringify(data));
    }
    return data;
  };

  getUserFollowers: PaginationAndSearchUserIDQuerier<GetUserProfileFollowPaginatedResponse> = async (
    userID,
    { maxID, query } = {},
    options?: AxiosRequestConfig,
  ) => {
    let data: GetUserProfileFollowPaginatedResponse | ErrorResponse | undefined = undefined;

    const params = new URLSearchParams();

    if (maxID) params.append('max_id', maxID);
    if (query) params.append('query', query);

    try {
      const res = await this._fetchAuthGetRequest<GetUserProfileFollowPaginatedResponse>(
        `${BASE_API_URL}/api/v1/friendships/${userID}/followers/?${params.toString()}`,
        {
          ...options,
          headers: { 'X-Ig-Nav-Chain': '', ...options?.headers },
        },
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[USER FOLLOWERS] Failed to fetch', data);
      }
      throw new Error('Failed to fetch user followers: ' + JSON.stringify(data));
    }
    return data;
  };

  getUserFollowings: PaginationAndSearchUserIDQuerier<GetUserProfileFollowPaginatedResponse> = async (
    userID,
    { maxID, query } = {},
    options?: AxiosRequestConfig,
  ) => {
    let data: GetUserProfileFollowPaginatedResponse | ErrorResponse | undefined = undefined;

    const params = new URLSearchParams();

    if (maxID) params.append('max_id', maxID);
    if (query) params.append('query', query);

    try {
      const res = await this._fetchAuthGetRequest<GetUserProfileFollowPaginatedResponse | ErrorResponse>(
        `${BASE_API_URL}/api/v1/friendships/${userID}/following/?${params.toString()}`,
        {
          ...options,
          headers: { 'X-Ig-Nav-Chain': '', ...options?.headers },
        },
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[USER FOLLOWINGS] Failed to fetch', data);
      }
      throw new Error('Failed to fetch user followings: ' + JSON.stringify(data));
    }
    return data;
  };

  getPostIDfromThreadID = (threadID: string): string => {
    threadID = threadID.split('?')[0];
    threadID = threadID.replace(/\s/g, '');
    threadID = threadID.replace(/\//g, '');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
    let postID = 0n;
    for (const letter of threadID) {
      postID = postID * 64n + BigInt(alphabet.indexOf(letter));
    }
    return postID.toString();
  };

  getPostIDfromURL = (postURL: string): string => {
    let threadID = postURL?.split('?')[0];
    if (threadID?.endsWith('/')) {
      threadID = threadID.slice(0, -1);
    }
    threadID = threadID?.split('/').pop() || '';
    return this.getPostIDfromThreadID((threadID as any) || '');
  };

  getThreads = async (postID: string, options?: AxiosRequestConfig) => {
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }

    const res = await this._requestUserDataQuery<GetUserProfileThreadResponse>(
      'https://www.threads.net/api/graphql',
      {
        lsd: this.fbLSDToken,
        variables: JSON.stringify({ postID }),
        doc_id: '5587632691339264',
      },

      options,
    );
    const thread = res.data.data.data;
    return thread;
  };

  getThreadsLoggedIn: PaginationRepliesQuerier<GetThreadRepliesPaginatedResponse> = async (
    postID,
    maxID = '',
    options = {},
  ): Promise<GetThreadRepliesPaginatedResponse> => {
    let data: GetThreadRepliesPaginatedResponse | ErrorResponse | undefined = undefined;
    try {
      const res = await this._fetchAuthGetRequest<GetThreadRepliesPaginatedResponse | ErrorResponse>(
        `${BASE_API_URL}/api/v1/text_feed/${postID}/replies/${maxID ? `?paging_token=${maxID}` : ''}`,
        options,
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[USER FEED] Failed to fetch', data);
      }
      throw new Error('Failed to fetch user feed: ' + JSON.stringify(data));
    }
    return data;
  };

  getThreadLikers = async (postID: string, options?: AxiosRequestConfig) => {
    if (this.verbose) {
      console.debug('[fbLSDToken] USING', this.fbLSDToken);
    }

    const res = await this._requestUserDataQuery<GetThreadLikersResponse>(
      'https://www.threads.net/api/graphql',
      {
        lsd: this.fbLSDToken,
        variables: JSON.stringify({ mediaID: postID }),
        doc_id: '9360915773983802',
      },

      options,
    );
    const likers = res.data.data.likers;
    return likers;
  };

  getTimeline = async (maxID: string = '', options?: AxiosRequestConfig): Promise<GetTimelineResponse> => {
    if (!this.token && (!this.username || !this.password)) {
      throw new Error('Username or password not set');
    }

    const token = await this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }

    try {
      const res = await this._requestQuery<GetTimelineResponse>(
        `${BASE_API_URL}/api/v1/feed/text_post_app_timeline/`,
        { pagination_source: 'text_post_feed_threads', max_id: maxID || undefined },
        { ...options, headers: this._getAppHeaders() },
      );
      return res.data;
    } catch (error: any) {
      if (this.verbose) {
        console.log('[TIMELINE FETCH FAILED]', error.response.data);
      }
      throw new Error('Failed to fetch timeline');
    }
  };

  _fetchAuthGetRequest = async <T extends any | ErrorResponse | undefined>(
    url: string,
    options?: AxiosRequestConfig,
  ) => {
    const token = await this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const res = await axios.get<T>(url, {
      ...options,
      headers: {
        ...this._getInstaHeaders(),
        ...options?.headers,
      },
    });
    return res;
  };

  _toggleAuthPostRequest = async <T extends any | ErrorResponse | undefined>(
    url: string,
    data?: Record<string, string>,
    options?: AxiosRequestConfig,
  ) => {
    const token = await this.getToken();
    if (!token) {
      throw new Error('Token not found');
    }
    const res = await axios.post<T>(url, !data ? undefined : new URLSearchParams(data), {
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
      `${BASE_API_URL}/api/v1/media/${postID}_${userID}/like/`,
      undefined,
      options,
    );
    return res.data;
  };
  unlike = async (postID: string, options?: AxiosRequestConfig) => {
    const userID = await this.getCurrentUserID();
    const res = await this._toggleAuthPostRequest<{ status: 'ok' | string }>(
      `${BASE_API_URL}/api/v1/media/${postID}_${userID}/unlike/`,
      undefined,
      options,
    );
    return res.data;
  };
  follow = async (userID: string, options?: AxiosRequestConfig) => {
    const res = await this._toggleAuthPostRequest<FriendshipStatusResponse>(
      `${BASE_API_URL}/api/v1/friendships/create/${userID}/`,
      undefined,
      options,
    );
    if (this.verbose) {
      console.debug('[FOLLOW]', res.data);
    }
    return res.data;
  };
  unfollow = async (userID: string, options?: AxiosRequestConfig) => {
    const res = await this._toggleAuthPostRequest<FriendshipStatusResponse>(
      `${BASE_API_URL}/api/v1/friendships/destroy/${userID}/`,
      undefined,
      options,
    );
    if (this.verbose) {
      console.debug('[UNFOLLOW]', res.data);
    }
    return res.data;
  };
  repost = async (postID: string, options?: AxiosRequestConfig) => {
    const res = await this._toggleAuthPostRequest<FriendshipStatusResponse>(
      `${BASE_API_URL}/api/v1/repost/create_repost/`,
      { media_id: postID },
      options,
    );
    if (this.verbose) {
      console.debug('[REPOST]', res.data);
    }
    return res.data;
  };
  unrepost = async (originalPostID: string, options?: AxiosRequestConfig) => {
    const res = await this._toggleAuthPostRequest<FriendshipStatusResponse>(
      `${BASE_API_URL}/api/v1/repost/delete_text_app_repost/`,
      { original_media_id: originalPostID },
      options,
    );
    if (this.verbose) {
      console.debug('[UNREPOST]', res.data);
    }
    return res.data;
  };
  mute = async (
    muteOptions: { postID?: string; userID: string },
    options?: AxiosRequestConfig,
  ): Promise<boolean> => {
    const url = `${BASE_API_URL}/api/v1/friendships/mute_posts_or_story_from_follow/`;
    let data = {
      _uid: this.userID,
      _uuid: this.deviceID,
      container_module: 'ig_text_feed_timeline',
    } as {
      media_id?: string;
      _uid: string;
      _uuid: string;
      container_module: string;
      target_posts_author_id: string;
    };

    if (muteOptions.postID) {
      data.media_id = String(muteOptions.postID);
    }
    data.target_posts_author_id = String(muteOptions.userID);

    const payload = {
      signed_body: `SIGNATURE.${encodeURIComponent(JSON.stringify(data))}`,
    };

    const res = await this._toggleAuthPostRequest<any>(url, payload, options);
    if (this.verbose) {
      console.debug('[MUTE]', res.data);
    }
    return res.data;
  };
  unmute = async (
    muteOptions: { postID?: string; userID: string },
    options?: AxiosRequestConfig,
  ): Promise<boolean> => {
    const url = `${BASE_API_URL}/api/v1/friendships/unmute_posts_or_story_from_follow/`;
    let data = {
      _uid: this.userID,
      _uuid: this.deviceID,
      container_module: 'ig_text_feed_timeline',
    } as {
      media_id?: string;
      _uid: string;
      _uuid: string;
      container_module: string;
      target_posts_author_id: string;
    };

    if (muteOptions.postID) {
      data.media_id = String(muteOptions.postID);
    }
    data.target_posts_author_id = String(muteOptions.userID);

    const payload = {
      signed_body: `SIGNATURE.${encodeURIComponent(JSON.stringify(data))}`,
    };

    const res = await this._toggleAuthPostRequest<any>(url, payload, options);
    if (this.verbose) {
      console.debug('[UNMUTE]', res.data);
    }
    return res.data;
  };
  block = async (userID: string, options?: AxiosRequestConfig): Promise<boolean> => {
    const url = `${BASE_API_URL}/api/v1/friendships/block/${userID}/`;
    let data = {
      surface: 'ig_text_feed_timeline',
      is_auto_block_enabled: true,
      user_id: userID,
      _uid: this.userID,
      _uuid: this.deviceID,
    };

    const payload = {
      signed_body: `SIGNATURE.${encodeURIComponent(JSON.stringify(data))}`,
    };

    const res = await this._toggleAuthPostRequest<any>(url, payload, options);
    if (this.verbose) {
      console.debug('[MUTE]', res.data);
    }
    return res.data;
  };
  unblock = async (userID: string, options?: AxiosRequestConfig): Promise<boolean> => {
    const url = `${BASE_API_URL}/api/v1/friendships/unblock/${userID}/`;
    let data = {
      user_id: userID,
      _uid: this.userID,
      _uuid: this.deviceID,
      container_module: 'ig_text_feed_timeline',
    };

    const payload = {
      signed_body: `SIGNATURE.${encodeURIComponent(JSON.stringify(data))}`,
    };

    const res = await this._toggleAuthPostRequest<any>(url, payload, options);
    if (this.verbose) {
      console.debug('[MUTE]', res.data);
    }
    return res.data;
  };

  getNotifications: PaginationNotificationsQuerier<GetNotificationsPaginatedResponse> = async (
    filter,
    pagination,
    options = {},
  ): Promise<GetNotificationsPaginatedResponse> => {
    let params: GetNotificationsOptions = {
      feed_type: 'all',
      mark_as_seen: false,
      timezone_offset: -25200,
      timezone_name: 'America%2FLos_Angeles',
    };

    if (filter) {
      params.selected_filters = filter;
    }

    if (pagination) {
      params.max_id = pagination.maxID;
      params.pagination_first_record_timestamp = pagination.firstRecordTimestamp;
    }

    const queryString = Object.entries(params)
      .map(([key, value]) => key + '=' + value)
      .join('&');

    let data: GetNotificationsPaginatedResponse | ErrorResponse | undefined = undefined;
    try {
      const res = await this._fetchAuthGetRequest<GetNotificationsPaginatedResponse>(
        `${BASE_API_URL}/api/v1/text_feed/text_app_notifications/?${queryString}`,
        options,
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[NOTIFICATIONS] Failed to fetch', data);
      }
      throw new Error('Failed to fetch notifications: ' + JSON.stringify(data));
    }
    return data;
  };

  setNotificationsSeen = async (options?: AxiosRequestConfig): Promise<boolean> => {
    const url = `${BASE_API_URL}/api/v1/text_feed/text_app_inbox_seen/`;
    const payload = {
      _uuid: `${this.userID}`,
    };
    const res = await this._toggleAuthPostRequest<any>(url, payload, options);
    if (this.verbose) {
      console.debug('[SET_NOTIFICATIONS_SEEN]', res.data);
    }
    return res.data;
  };

  searchUsers: SearchQuerier<SearchUsersResponse> = async (
    query,
    count = 30,
    options = {},
  ): Promise<SearchUsersResponse> => {
    let params = {
      q: query,
      count,
    };

    const queryString = Object.entries(params)
      .map(([key, value]) => key + '=' + value)
      .join('&');

    let data: SearchUsersResponse | ErrorResponse | undefined = undefined;
    try {
      const res = await this._fetchAuthGetRequest<SearchUsersResponse>(
        `${BASE_API_URL}/api/v1/users/search/?${queryString}`,
        options,
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[USER SEARCH] Failed to fetch', data);
      }
      throw new Error('Failed to fetch user search results: ' + JSON.stringify(data));
    }
    return data;
  };

  getRecommendedUsers: PaginationRecommendedQuerier<GetRecommendedUsersPaginatedResponse> = async (
    maxID = '',
    options = {},
  ): Promise<GetRecommendedUsersPaginatedResponse> => {
    let data: GetRecommendedUsersPaginatedResponse | ErrorResponse | undefined = undefined;
    try {
      const res = await this._fetchAuthGetRequest<GetRecommendedUsersPaginatedResponse>(
        `${BASE_API_URL}/api/v1/text_feed/recommended_users/?${maxID ? `?max_id=${maxID}` : ''}`,
        options,
      );
      data = res.data;
    } catch (error: any) {
      data = error.response?.data;
    }
    if (data?.status !== 'ok') {
      if (this.verbose) {
        console.log('[RECOMMENDED] Failed to fetch', data);
      }
      throw new Error('Failed to fetch recommended users: ' + JSON.stringify(data));
    }
    return data;
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
    await this.login();
    return this.token;
  };

  _timezoneOffset: number | undefined;
  _lastUploadID = 0;
  _nextUploadID = () => {
    const now = Date.now();
    const lastUploadID = this._lastUploadID;
    // Avoid upload_id collisions.
    return (this._lastUploadID = now < lastUploadID ? lastUploadID + 1 : now).toString();
  };
  _createUploadMetadata = (uploadID = this._nextUploadID()) => {
    return {
      upload_id: uploadID,
      source_type: '4',
      timezone_offset: (this._timezoneOffset ??= -(new Date().getTimezoneOffset() * 60)).toString(),
      device: this.device,
    };
  };

  publish = async (rawOptions: ThreadsAPI.PublishOptions | string): Promise<string | undefined> => {
    const options: ThreadsAPI.PublishOptions =
      typeof rawOptions === 'string' ? { text: rawOptions } : rawOptions;

    if (!this.token && (!this.username || !this.password)) {
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

    let data: any = {
      ...this._createUploadMetadata(),
      text_post_app_info: {
        reply_control: REPLY_CONTROL_OPTIONS[options.replyControl ?? 'everyone'],
      },
      _uid: userID,
      device_id: this.deviceID,
      caption: options.text || '',
    };

    let endpoint = '';
    let attachment = options.attachment;
    if (!attachment) {
      if ('image' in options && options.image) {
        attachment = { image: options.image };
      } else if ('url' in options && options.url) {
        attachment = { url: options.url };
      }
    }

    if (attachment) {
      if (attachment.url) {
        data.text_post_app_info.link_attachment_url = attachment.url;
      } else if (attachment.image) {
        endpoint = '';
        await this.uploadImage(attachment.image, data.upload_id);
        data.scene_type = null;
        data.scene_capture_type = '';
      } else if (attachment.sidecar) {
        endpoint = '';
        data.client_sidecar_id = data.upload_id;
        data.children_metadata = [];
        for (const image of attachment.sidecar) {
          // Images are uploaded one at a time, just like the app does.
          const imageUploadID = (await this.uploadImage(image)).upload_id;
          data.children_metadata.push({
            ...this._createUploadMetadata(imageUploadID),
            scene_type: null,
            scene_capture_type: '',
          });
        }
      }
    }

    if (!!options.parentPostID) {
      // Ensure no user ID is included in the parent post ID.
      data.text_post_app_info.reply_id = options.parentPostID.replace(/_\d+$/, '');
    }
    if (!!options.quotedPostID) {
      // Ensure no user ID is included in the quoted post ID.
      data.text_post_app_info.quoted_post_id = options.quotedPostID.replace(/_\d+$/, '');
    }
    if (endpoint === '') {
      data.publish_mode = 'text_post';
    }

    const payload = `signed_body=SIGNATURE.${encodeURIComponent(JSON.stringify(data))}`;

    type Response = {
      media: {
        id: string;
      };
      status: 'ok';
    };

    const res = await axios.post<Response>(endpoint, payload, {
      httpAgent: this.httpAgent,
      httpsAgent: this.httpsAgent,
      headers: this._getAppHeaders(),
      timeout: 60 * 1000,
    });

    if (this.verbose) {
      console.debug('[PUBLISH]', res.data);
    }

    if (res.data.status === 'ok') {
      return res.data.media.id;
    }

    return undefined;
  };

  delete = async (postID: string, options?: AxiosRequestConfig): Promise<boolean> => {
    const url = `${BASE_API_URL}/api/v1/media/${postID}/delete/`;
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
    if (res.data.status === 'ok') {
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

  uploadImage = async (
    image: ThreadsAPI.Image,
    uploadID = this._nextUploadID(),
  ): Promise<InstagramImageUploadResponse> => {
    const name = `${uploadID}_0_${Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000)}`;
    const url: string = `https://www.instagram.com/rupload_igphoto/${name}`;

    let content: Buffer;
    let mime_type: string | null;

    if (typeof image === 'string' || 'path' in image) {
      const imagePath = typeof image === 'string' ? image : image.path;
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
    } else {
      content = image.data;
      const mimeTypeResult = image.type.includes('/') ? image.type : mimeTypes.lookup(image.type);
      mime_type = mimeTypeResult ? mimeTypeResult : 'application/octet-stream';
    }

    const x_instagram_rupload_params = {
      upload_id: uploadID,
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
      X_FB_PHOTO_WATERFALL_ID: uuidv4(),
      'X-Entity-Type': mime_type!! !== undefined ? `image/${mime_type!!}` : 'image/jpeg',
      Offset: '0',
      'X-Instagram-Rupload-Params': JSON.stringify(x_instagram_rupload_params),
      'X-Entity-Name': name,
      'X-Entity-Length': contentLength.toString(),
      'Content-Length': contentLength.toString(),
      'Accept-Encoding': 'gzip',
    };

    if (this.verbose) {
      console.log(`[UPLOAD_IMAGE] Uploading ${contentLength.toLocaleString()}b as ${uploadID}...`);
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
      throw new Error('Upload image failed');
    }
  };
}

/** @deprecated Use `ThreadsAPI.Options` instead. */
export type ThreadsAPIOptions = ThreadsAPI.Options;

/** @deprecated Use `ThreadsAPI.PostReplyControl` instead. */
export type ThreadsAPIPostReplyControl = ThreadsAPI.PostReplyControl;

/** @deprecated Use `ThreadsAPI.RawImage` or `ThreadsAPI.ExternalImage` instead. */
export type ThreadsAPIImage = ThreadsAPI.RawImage | ThreadsAPI.ExternalImage;

/** @deprecated Use `ThreadsAPI.PublishOptions` instead. */
export type ThreadsAPIPublishOptions = ThreadsAPI.PublishOptions;

export default ThreadsAPI;
