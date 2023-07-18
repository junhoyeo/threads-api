export interface ThreadsUser extends Partial<{
  biography: string;
  biography_with_entities: ThreadsBiographyWithEntities;
  external_url: string;
  primary_profile_link_type: number;
  show_fb_link_on_profile: boolean;
  show_fb_page_link_on_profile: boolean;
  can_hide_category: boolean;
  category?: any;
  is_category_tappable: boolean;
  is_business: boolean;
  professional_conversion_suggested_account_type: number;
  account_type: number;
  displayed_action_button_partner?: any;
  smb_delivery_partner?: any;
  smb_support_delivery_partner?: any;
  displayed_action_button_type?: any;
  smb_support_partner?: any;
  is_call_to_action_enabled?: any;
  num_of_admined_pages?: any;
  page_id?: any;
  page_name?: any;
  ads_page_id?: any;
  ads_page_name?: any;
  account_badges?: any[];
  fbid_v2: string;
  full_name: string;
  follower_count: number;
  following_count: number;
  following_tag_count: number;
  has_anonymous_profile_picture: boolean;
  has_onboarded_to_text_post_app: boolean;
  is_private: boolean;
  is_verified: boolean;
  media_count: number;
  pk: number;
  pk_id: string;
  profile_pic_id: string;
  text_post_app_joiner_number: number;
  third_party_downloads_enabled: number;
  username: string;
  current_catalog_id?: any;
  mini_shop_seller_onboarding_status?: any;
  shopping_post_onboard_nux_type?: any;
  ads_incentive_expiration_date?: any;
  account_category: string;
  auto_expand_chaining?: any;
  bio_interests: ThreadsBioInterests;
  bio_links: any[];
  can_add_fb_group_link_on_profile: boolean;
  can_use_affiliate_partnership_messaging_as_creator: boolean;
  can_use_affiliate_partnership_messaging_as_brand: boolean;
  can_use_branded_content_discovery_as_brand: boolean;
  can_use_branded_content_discovery_as_creator: boolean;
  creator_shopping_info: ThreadsCreatorShoppingInfo;
  existing_user_age_collection_enabled: boolean;
  fan_club_info: ThreadsFanClubInfo;
  feed_post_reshare_disabled: boolean;
  follow_friction_type: number;
  has_chaining: boolean;
  has_collab_collections: boolean;
  has_exclusive_feed_content: boolean;
  has_fan_club_subscriptions: boolean;
  has_guides: boolean;
  has_highlight_reels: boolean;
  has_music_on_profile: boolean;
  has_private_collections: boolean;
  has_public_tab_threads: boolean;
  has_videos: boolean;
  hd_profile_pic_url_info: ThreadsHdProfilePicVersion;
  hd_profile_pic_versions: ThreadsHdProfilePicVersion[];
  highlight_reshare_disabled: boolean;
  include_direct_blacklist_status: boolean;
  is_bestie: boolean;
  is_favorite: boolean;
  is_favorite_for_stories: boolean;
  is_favorite_for_igtv: boolean;
  is_favorite_for_clips: boolean;
  is_favorite_for_highlights: boolean;
  is_in_canada: boolean;
  is_interest_account: boolean;
  is_memorialized: boolean;
  is_new_to_instagram: boolean;
  is_potential_business: boolean;
  is_profile_broadcast_sharing_enabled: boolean;
  is_regulated_c18: boolean;
  is_supervision_features_enabled: boolean;
  is_whatsapp_linked: boolean;
  live_subscription_status: string;
  mutual_followers_count: number;
  nametag?: any;
  open_external_url_with_in_app_browser: boolean;
  pinned_channels_info: ThreadsPinnedChannelsInfo;
  profile_context: string;
  profile_context_facepile_users: any[];
  profile_context_links_with_user_ids: any[];
  profile_pic_url: string;
  profile_type: number;
  pronouns: any[];
  remove_message_entrypoint: boolean;
  robi_feedback_source?: any;
  show_account_transparency_details: boolean;
  show_ig_app_switcher_badge: boolean;
  show_post_insights_entry_point: boolean;
  show_text_post_app_badge: boolean;
  show_text_post_app_switcher_badge: boolean;
  total_ar_effects: number;
  total_igtv_videos: number;
  transparency_product_enabled: boolean;
  usertags_count: number;
  id: any;
}> {
  pk: number;
  username: string;
  full_name: string;
  is_verified: boolean;
  is_private: boolean;
  profile_pic_url: string;
}

export interface ThreadsBiographyWithEntities {
  raw_text: string;
  entities?: (null)[] | null;
}
export interface ThreadsBioInterests {
  interests?: (null)[] | null;
}
export interface ThreadsCreatorShoppingInfo {
  linked_merchant_accounts?: (null)[] | null;
}
export interface ThreadsFanClubInfo {
  fan_club_id?: any;
  fan_club_name?: any;
  is_fan_club_referral_eligible?: any;
  fan_consideration_page_revamp_eligiblity?: any;
  is_fan_club_gifting_eligible?: any;
  subscriber_count?: any;
  connected_member_count?: any;
  autosave_to_exclusive_highlight?: any;
  has_enough_subscribers_for_ssc?: any;
}

export interface ThreadsPinnedChannelsInfo {
  pinned_channels_list?: (null)[] | null;
  has_public_channels: boolean;
}
export interface ThreadsHdProfilePicVersion {
  url: string;
  width: number;
  height: number;
}
export interface ThreadsBioLink {
  url: string;
}

// export interface ThreadsUser {
//   is_private: boolean;
//   profile_pic_url: string;
//   username: string;
//   hd_profile_pic_versions: ThreadsHdProfilePicVersion[];
//   is_verified: boolean;
//   biography: string;
//   biography_with_entities: any;
//   follower_count: number;
//   profile_context_facepile_users: any;
//   bio_links: ThreadsBioLink[];
//   pk: string;
//   full_name: string;
//   id: any;
// }
// export interface ThreadsHdProfilePicVersion {
//   height: number;
//   url: string;
//   width: number;
// }
// export interface ThreadsBioLink {
//   url: string;
// }


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
  user: ThreadsUser;
  carousel_media_count?: any;
  carousel_media?: any;
  carousel_media_ids?: string[];
  has_audio?: any;
  media_overlay_info: any;
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
  user: ThreadsUser;
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

export interface Story {
  story_type: number;
  type: number;
  args: StoryArgs;
  counts: any[];
  pk: string;
}

export interface StoryArgs {
  extra_actions?: (string)[] | null;
  profile_id: number;
  profile_name: string;
  profile_image: string;
  profile_image_destination: string;
  destination: string;
  rich_text: string;
  extra: StoryExtra;
  actions?: (string)[] | null;
  inline_controls?: (StoryInlineControls)[] | null;
  timestamp: number;
  tuuid: string;
  clicked: boolean;
  af_candidate_id: number;
}

export interface StoryExtra {
  title: string;
  is_aggregated: boolean;
  icon_name: string;
  icon_color: string;
  icon_url: string;
  context: string;
  content: string;
}

export interface StoryInlineControls {
  action_type: string;
}

export interface AndroidDevice {
  manufacturer: string;
  model: string;
  os_version: number;
  os_release: string;
}
