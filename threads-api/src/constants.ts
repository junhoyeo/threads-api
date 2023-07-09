export const DEFAULT_LSD_TOKEN = 'NjppQDEgONsU_1LCzrmp6q';
export const DEFAULT_DEVICE_ID = `android-${Math.floor(Math.random() * 1e24).toString(16)}`;
export const POST_HEADERS_DEFAULT: any = {
  'User-Agent': 'Barcelona 289.0.0.77.109 Android',
  'Sec-Fetch-Site': 'same-origin',
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
};
export const BASE_API_URL = 'https://i.instagram.com/api/v1';
export const LOGIN_URL = BASE_API_URL + '/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/';
export const POST_URL = BASE_API_URL + '/media/configure_text_only_post/';
export const POST_WITH_IMAGE_URL = BASE_API_URL + '/media/configure_text_post_app_feed/';
export const UPDATE_MEDIA_PQD_HASH_URL = BASE_API_URL + '/media/update_media_with_pdq_hash_info/';
