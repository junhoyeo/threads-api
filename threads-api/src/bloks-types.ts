export type LoginResponseBlok = [
  'bk.action.caa.HandleLoginResponse',
  [
    'bk.action.tree.Make',
    ['bk.action.i32.Const', number],
    ['bk.action.i32.Const', number],
    string,
    ['bk.action.i32.Const', number],
    'Password',
    ['bk.action.i32.Const', number],
    'Login',
  ],
  null,
  ['bk.action.core.GetArg', number],
];

export type ThreadsLoginFailResponseBlok = [
  'ig.action.cdsdialog.OpenDialog',
  [
    'bk.action.tree.Make',
    ['bk.action.i32.Const', number],
    ['bk.action.i32.Const', number],
    'Incorrect Password',
    ['bk.action.i32.Const', number],
    string,
    ['bk.action.i32.Const', number],
    [
      'bk.action.tree.Make',
      ['bk.action.i32.Const', number],
      ['bk.action.i32.Const', number],
      'OK',
      ['bk.action.i32.Const', number],
      [
        'bk.action.core.FuncConst',
        [
          'bk.action.logging.LogEvent',
          'caa_login_client_events_ig',
          '',
          [
            'bk.action.map.Make',
            ['bk.action.array.Make', 'core', 'login_params'],
            [
              'bk.action.array.Make',
              [
                'bk.action.map.Make',
                [
                  'bk.action.array.Make',
                  'event',
                  'event_category',
                  'event_flow',
                  'event_request_id',
                  'event_step',
                  'is_dark_mode',
                  'exception_code',
                  'exception_message',
                  'exception_type',
                  'extra_client_data',
                  'logged_out_identifier',
                  'logged_in_identifier',
                  'waterfall_id',
                ],
                [
                  'bk.action.array.Make',
                  'login_error_dialog_ok_clicked',
                  'login_home_page_interaction',
                  'login_manual',
                  string,
                  'home_page',
                  ['ig.action.IsDarkModeEnabled'],
                  ['bk.action.i32.Const', number],
                  string,
                  string,
                  ['bk.action.map.Make', ['bk.action.array.Make'], ['bk.action.array.Make']],
                  '',
                  '',
                  string,
                ],
              ],
              ['bk.action.map.Make', ['bk.action.array.Make'], ['bk.action.array.Make']],
            ],
          ],
        ],
      ],
    ],
    ['bk.action.i32.Const', number],
    ['bk.action.i32.Const', number],
  ],
  ['bk.action.tree.Make', ['bk.action.i32.Const', number]],
];

export type ThreadsLogin2FARequiredResponseBlok = [
  'bk.action.caa.PresentTwoFactorAuthFlow',
  ['bk.action.core.GetArg', 0],
  string, // JSON string of type ThreadsTwoFactorAuthFlowData
];

export type ThreadsLoginResponseData = {
  login_response: string;
  headers: string;
  cookies: string | null;
};

export type LoginHeaders = {
  'IG-Set-Authorization': string; // "Bearer IGT:2:SOME_BASE64_STRING",
  'IG-Set-Password-Encryption-Key-Id': string;
  'IG-Set-Password-Encryption-Pub-Key': string; // base64 encoded public key
  'Access-Control-Expose-Headers': string; // "X-IG-Set-WWW-Claim",
  'IG-Set-X-MID': string;
  'X-IG-Reload-Proxy-Request-Info': string; // "{\\\"request_index\\\": number, \\\"view_name\\\": \\\"None.None\\\", \\\"uuid\\\": \\\"SOME_UUID\\\", \\\"sanitized_path\\\": \\\"/accounts/caa_ig_authentication_thrift_server/\\\"}",
  'Cross-Origin-Opener-Policy': string; // "same-origin-allow-popups;report-to=\\\"coop\\\"",
  'x-fb-endpoint': string; // "",
  'X-Frame-Options': string; // "SAMEORIGIN",
  'Cache-Control': string; // "private, no-cache, no-store, must-revalidate",
  Pragma: string; // "no-cache",
  Expires: string; // "Sat, 01 Jan 2000 00:00:00 GMT",
  'Strict-Transport-Security': string; // "max-age=31536000",
  'X-Content-Type-Options': string; // "nosniff",
  'X-Xss-Protection': string; // "0",
  'ig-set-ig-u-ds-user-id': number;
  'ig-set-ig-u-rur': string; // "RVA",
  'Cross-Origin-Embedder-Policy-Report-Only': string; // "require-corp;report-to=\\\"coep\\\""
};

export type LoginResponseData = {
  logged_in_user: {
    fbid_v2: number;
    text_post_app_take_a_break_setting: 0 | 1;
    is_using_unified_inbox_for_direct: boolean;
    show_insights_terms: boolean;
    allowed_commenter_type: 'any' | string;
    reel_auto_archive: 'unset' | string;
    can_hide_category: boolean;
    has_onboarded_to_text_post_app: boolean;
    text_post_app_joiner_number_label: string;
    pk: number;
    pk_id: string;
    username: string;
    full_name: string;
    is_private: boolean;
    third_party_downloads_enabled: 0 | 1;
    has_anonymous_profile_picture: boolean;
    supervision_info: {
      is_eligible_for_supervision: boolean;
      is_supervised_user: boolean;
      is_supervised_or_in_cooldown: boolean;
      has_guardian: boolean;
      is_guardian_user: boolean;
      is_supervised_by_viewer: boolean;
      is_guardian_of_viewer: boolean;
      has_stated_age: boolean;
      screen_time_daily_limit_seconds: null | number;
      screen_time_daily_limit_description: null | string;
      fc_url: string;
      quiet_time_intervals: null | number;
      is_quiet_time_feature_enabled: boolean;
      daily_time_limit_without_extensions_seconds: null | number;
      latest_valid_time_limit_extension_request: null | number;
    };
    is_supervision_features_enabled: boolean;
    page_id: null | number;
    page_name: null | string;
    interop_messaging_user_fbid: number;
    biz_user_inbox_state: 0 | 1;
    nametag: {
      mode: number;
      gradient: number;
      emoji: string;
      selfie_sticker: number;
    };
    has_placed_orders: boolean;
    total_igtv_videos: number;
    can_boost_post: boolean;
    can_see_organic_insights: boolean;
    wa_addressable: boolean;
    wa_eligibility: number;
    has_encrypted_backup: boolean;
    is_category_tappable: boolean;
    is_business: boolean;
    professional_conversion_suggested_account_type: number;
    account_type: 1;
    is_verified: boolean;
    profile_pic_id: string;
    profile_pic_url: string;
    is_call_to_action_enabled: null;
    category: null;
    account_badges: [];
    allow_contacts_sync: boolean;
    phone_number: string;
    country_code: number;
    national_number: number | string;
  };
  session_flush_nonce: null | string;
  status: 'ok' | string;
};

export type ThreadsTwoFactorAuthFlowData = {
  message?: string;
  two_factor_required?: boolean;
  two_factor_info?: TwoFactorInfo;
  phone_verification_settings?: PhoneVerificationSettings;
  status?: string;
  error_type?: string;
};

export type PhoneVerificationSettings = {
  max_sms_count?: number;
  resend_sms_delay_sec?: number;
  robocall_count_down_time_sec?: number;
  robocall_after_max_sms?: boolean;
};

export type TwoFactorInfo = {
  pk?: number;
  username?: string;
  sms_two_factor_on?: boolean;
  whatsapp_two_factor_on?: boolean;
  totp_two_factor_on?: boolean;
  eligible_for_multiple_totp?: boolean;
  obfuscated_phone_number?: string;
  obfuscated_phone_number_2?: string;
  two_factor_identifier?: string;
  show_messenger_code_option?: boolean;
  show_new_login_screen?: boolean;
  show_trusted_device_option?: boolean;
  should_opt_in_trusted_device_option?: boolean;
  pending_trusted_notification?: boolean;
  sms_not_allowed_reason?: null;
  trusted_notification_polling_nonce?: string;
  is_trusted_device?: boolean;
  device_id?: string;
  phone_verification_settings?: PhoneVerificationSettings;
};
