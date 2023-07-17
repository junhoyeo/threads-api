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
  header?: any;
  thread_type: string;
  show_create_reply_cta: boolean;
  id: string;
  view_state_item_type?: number;
  posts: Post[];
}

export interface ThreadItem {
  post: Post;
  line_type: string;
  view_replies_cta_string?: string;
  should_show_replies_cta: boolean;
  reply_facepile_users: ReplyFacepileUser[];
  reply_to_author?: any;
  can_inline_expand_below: boolean;
  __typename: string;
}

export interface TextPostAppInfo {
  is_post_unavailable: boolean;
  is_reply: boolean;
  reply_to_author: boolean;
  direct_reply_count: number;
  self_thread: boolean;
  reply_facepile_users: ReplyFacepileUser[];
  link_preview_attachment: LinkPreviewAttachment;
  can_reply: boolean;
  reply_control: string;
  hush_info: any;
  share_info: ShareInfo;
}

export interface LinkPreviewAttachment {
  url: string;
  display_url: string;
  title: string;
  image_url: string;
}

export interface Post {
  pk: string;
  id: string;
  text_post_app_info: TextPostAppInfo;
  caption?: Caption | null;
  taken_at: number;
  device_timestamp: number;
  media_type: number;
  code: string;
  client_cache_key: string;
  filter_type: number;
  product_type: string;
  organic_tracking_token: string;
  image_versions2: ImageVersions2;
  original_width: number;
  original_height: number;
  video_versions: any[];
  like_count: number;
  timezone_offset: number;
  has_liked: boolean;
  like_and_view_counts_disabled: boolean;
  can_viewer_reshare: boolean;
  integrity_review_decision: string;
  top_likers: any[];
  user: ThreadsUserSummary;
  carousel_media_count?: any;
  carousel_media?: any;
  carousel_media_ids?: string[];
  has_audio?: any;
  media_overlay_info: any;
}

export interface ThreadsUserSummary {
  pk: any;
  pk_id: any;
  id?: any;
  username: string;
  full_name: string;
  is_private: boolean;
  is_verified: boolean;
  profile_pic_id: string;
  profile_pic_url: string;
  fbid_v2?: string;
  friendship_status: FriendshipStatus;
  has_anonymous_profile_picture?: boolean;
  has_onboarded_to_text_post_app: boolean;
  account_badges: any[];
}

export interface FriendshipStatus {
  following: boolean,
  followed_by: boolean,
  blocking: boolean,
  muting: boolean,
  is_private: boolean,
  incoming_request: boolean,
  outgoing_request: boolean,
  text_post_app_pre_following: boolean,
  is_bestie: boolean,
  is_restricted: boolean,
  is_feed_favorite: boolean,
  is_eligible_to_subscribe: boolean
}

export interface ImageVersions2 {
  candidates: Candidate[] | ThreadsHdProfilePicVersion[];
}

export interface Candidate {
  width: number;
  height: number;
  url: string;
  scans_profile: string;
  __typename: string;
}

export interface ShareInfo {
  can_repost: boolean;
  is_reposted_by_viewer: boolean;
  repost_restricted_reason?: any;
  can_quote_post: boolean;
  quoted_post?: Post | null;
  reposted_post?: Post | null;
}

export interface VideoVersion {
  type: number;
  width: number;
  height: number;
  url: string;
  id: string;
  __typename: string;
}

export interface Caption {
  pk: string;
  user_id: any;
  text: string;
  type: number;
  created_at: number;
  created_at_utc: number;
  content_type: string;
  status: string;
  bit_flags: number;
  did_report_as_spam: boolean;
  share_enabled: boolean;
  user: ThreadsUserSummary;
  is_covered: boolean;
  is_ranked_comment: boolean;
  media_id: any;
  private_reply_status: number;
}

export interface ReplyFacepileUser {
  __typename: string;
  id: any;
  profile_pic_url: string;
}

export interface Extensions {
  is_final: boolean;
}
