export const DEFAULT_LSD_TOKEN = 'NjppQDEgONsU_1LCzrmp6q';
export const DEFAULT_DEVICE_ID = `android-${(Math.random() * 1e24).toString(36)}`;
export const BASE_API_URL = 'https://i.instagram.com/api/v1';
export const LOGIN_URL = BASE_API_URL + '/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/';
export const POST_URL = BASE_API_URL + '/media/configure_text_only_post/';
export const POST_WITH_IMAGE_URL = BASE_API_URL + '/media/configure_text_post_app_feed/';
export const DELETE_URL = (postID: string) => BASE_API_URL + `/media/${postID}/delete/`;
