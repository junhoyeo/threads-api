export interface ThreadsUser {
  is_private: boolean;
  profile_pic_url: string;
  username: string;
  hd_profile_pic_versions: ThreadsHdProfilePicVersion[];
  is_verified: boolean;
  biography: string;
  biography_with_entities: any;
  follower_count: number;
  profile_context_facepile_users: any;
  bio_links: ThreadsBioLink[];
  pk: string;
  full_name: string;
  id: any;
}
export interface ThreadsHdProfilePicVersion {
  height: number;
  url: string;
  width: number;
}
export interface ThreadsBioLink {
  url: string;
}

export interface Thread {
  thread_items: ThreadItem[];
  thread_type?: string;
  header?: any;
  id: string;
}

export interface ThreadItem {
  post: Post;
  line_type: string;
  view_replies_cta_string?: string;
  reply_facepile_users: ReplyFacepileUser[];
  should_show_replies_cta: boolean;
  __typename: string;
}

export interface QuotedPost {
  text_post_app_info: TextPostAppInfo;
  user: ThreadsUserSummary;
  pk: string;
  media_overlay_info: any;
  code: string;
  caption: Caption;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  video_versions: any[];
  carousel_media: any;
  carousel_media_count: any;
  has_audio: any;
  like_count: number;
  taken_at: number;
  id: string;
}
export interface TextPostAppInfo {
  link_preview_attachment: any;
  share_info: ShareInfo;
  reply_to_author: any;
  is_post_unavailable: boolean;
  direct_reply_count: number;
}

export interface Post {
  user: ThreadsUserSummary;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  video_versions: any[];
  carousel_media: any;
  carousel_media_count: any;
  pk: string;
  has_audio: any;
  text_post_app_info: TextPostAppInfo;
  caption?: Caption;
  taken_at: number;
  like_count: number;
  code: string;
  media_overlay_info: any;
  id: string;
}

export interface ThreadsUserSummary {
  profile_pic_url: string;
  username: string;
  id: any;
  is_verified: boolean;
  pk: string;
}

export interface ImageVersions2 {
  candidates: Candidate[] | ThreadsHdProfilePicVersion[];
}

export interface Candidate {
  height: number;
  url: string;
  width: number;
  __typename: string;
}

export interface ShareInfo {
  quoted_post?: QuotedPost;
  reposted_post?: RepostedPost;
}

export interface RepostedPost {
  pk: string;
  user: ThreadsUserSummary;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  video_versions: VideoVersion[];
  carousel_media: any;
  carousel_media_count: any;
  has_audio?: boolean;
  text_post_app_info: TextPostAppInfo;
  caption: Caption;
  like_count: number;
  taken_at: number;
  code: string;
  id: string;
}

export interface VideoVersion {
  type: number;
  url: string;
  __typename: string;
}

export interface Caption {
  text: string;
}

export interface ReplyFacepileUser {
  __typename: string;
  id: any;
  profile_pic_url: string;
}

export interface Extensions {
  is_final: boolean;
}
