import { GraphqlQuery } from '../core/request';

export class UserQuery extends GraphqlQuery<UserData, never> {
  readonly documentId = '23996318473300828';
  readonly variables: { userID: string };
  readonly responseKey = ['userData', 'user'];

  constructor(userID: string) {
    super();
    this.variables = { userID };
  }
}

export type UserData = {
  account_badges?: any[];
  account_category?: string;
  account_type?: number;
  ads_incentive_expiration_date?: any;
  ads_page_id?: any;
  ads_page_name?: any;
  auto_expand_chaining?: any;
  bio_interests?: {
    interests?: null[] | null;
  };
  bio_links?: any[];
  biography_with_entities?: {
    raw_text: string;
    entities?: null[] | null;
  };
  biography?: string;
  can_add_fb_group_link_on_profile?: boolean;
  can_hide_category?: boolean;
  can_use_affiliate_partnership_messaging_as_brand?: boolean;
  can_use_affiliate_partnership_messaging_as_creator?: boolean;
  can_use_branded_content_discovery_as_brand?: boolean;
  can_use_branded_content_discovery_as_creator?: boolean;
  category?: any;
  creator_shopping_info?: {
    linked_merchant_accounts?: null[] | null;
  };
  current_catalog_id?: any;
  displayed_action_button_partner?: any;
  displayed_action_button_type?: any;
  existing_user_age_collection_enabled?: boolean;
  external_url?: string;
  fan_club_info?: {
    fan_club_id?: any;
    fan_club_name?: any;
    is_fan_club_referral_eligible?: any;
    fan_consideration_page_revamp_eligiblity?: any;
    is_fan_club_gifting_eligible?: any;
    subscriber_count?: any;
    connected_member_count?: any;
    autosave_to_exclusive_highlight?: any;
    has_enough_subscribers_for_ssc?: any;
  };
  fbid_v2?: string;
  feed_post_reshare_disabled?: boolean;
  follow_friction_type?: number;
  follower_count?: number;
  following_count?: number;
  following_tag_count?: number;
  full_name: string;
  has_anonymous_profile_picture?: boolean;
  has_chaining?: boolean;
  has_collab_collections?: boolean;
  has_exclusive_feed_content?: boolean;
  has_fan_club_subscriptions?: boolean;
  has_guides?: boolean;
  has_highlight_reels?: boolean;
  has_music_on_profile?: boolean;
  has_onboarded_to_text_post_app?: boolean;
  has_private_collections?: boolean;
  has_public_tab_threads?: boolean;
  has_videos?: boolean;
  hd_profile_pic_url_info?: ImageLink;
  hd_profile_pic_versions?: ImageLink[];
  highlight_reshare_disabled?: boolean;
  id?: any;
  include_direct_blacklist_status?: boolean;
  is_bestie?: boolean;
  is_business?: boolean;
  is_call_to_action_enabled?: any;
  is_category_tappable?: boolean;
  is_favorite_for_clips?: boolean;
  is_favorite_for_highlights?: boolean;
  is_favorite_for_igtv?: boolean;
  is_favorite_for_stories?: boolean;
  is_favorite?: boolean;
  is_in_canada?: boolean;
  is_interest_account?: boolean;
  is_memorialized?: boolean;
  is_new_to_instagram?: boolean;
  is_potential_business?: boolean;
  is_private: boolean;
  is_profile_broadcast_sharing_enabled?: boolean;
  is_regulated_c18?: boolean;
  is_supervision_features_enabled?: boolean;
  is_verified: boolean;
  is_whatsapp_linked?: boolean;
  live_subscription_status?: string;
  media_count?: number;
  mini_shop_seller_onboarding_status?: any;
  mutual_followers_count?: number;
  nametag?: any;
  num_of_admined_pages?: any;
  open_external_url_with_in_app_browser?: boolean;
  page_id?: any;
  page_name?: any;
  pinned_channels_info?: {
    pinned_channels_list?: null[] | null;
    has_public_channels: boolean;
  };
  pk_id?: string;
  pk: number;
  primary_profile_link_type?: number;
  professional_conversion_suggested_account_type?: number;
  profile_context_facepile_users?: any[];
  profile_context_links_with_user_ids?: any[];
  profile_context?: string;
  profile_pic_id?: string;
  profile_pic_url: string;
  profile_type?: number;
  pronouns?: any[];
  remove_message_entrypoint?: boolean;
  robi_feedback_source?: any;
  shopping_post_onboard_nux_type?: any;
  show_account_transparency_details?: boolean;
  show_fb_link_on_profile?: boolean;
  show_fb_page_link_on_profile?: boolean;
  show_ig_app_switcher_badge?: boolean;
  show_post_insights_entry_point?: boolean;
  show_text_post_app_badge?: boolean;
  show_text_post_app_switcher_badge?: boolean;
  smb_delivery_partner?: any;
  smb_support_delivery_partner?: any;
  smb_support_partner?: any;
  text_post_app_joiner_number?: number;
  third_party_downloads_enabled?: number;
  total_ar_effects?: number;
  total_igtv_videos?: number;
  transparency_product_enabled?: boolean;
  username: string;
  usertags_count?: number;
};

type ImageLink = {
  url: string;
  width: number;
  height: number;
};
