import { PrivateClient } from '../clients/private';
import { PaginationOptions, PrivateQuery } from '../core/request';
import { ThreadsAPI } from '../types/public';

export declare namespace NotificationsQuery {
  type FilterType = keyof typeof NOTIFICATION_FILTER_TYPES;

  interface Options extends PaginationOptions {}
}

export type NotificationsData = {
  counts: {
    [key: string]: any;
  };
  last_checked: number;
  new_stories: ThreadsAPI.Story[];
  old_stories: ThreadsAPI.Story[];
  continuation_token: number;
  subscription: any;
  is_last_page: boolean;
  next_max_id: string;
  auto_load_more_enabled: boolean;
  pagination_first_record_timestamp: number;
  filters: any[];
  status: 'ok';
};

export class NotificationsQuery extends PrivateQuery {
  constructor(
    readonly filter?: NotificationsQuery.FilterType,
    readonly options?: NotificationsQuery.Options,
  ) {
    super();
  }

  url = `/api/v1/text_feed/text_app_notifications/`;

  send(client: PrivateClient) {
    this.searchParams = {
      feed_type: 'all',
      mark_as_seen: false,
      timezone_offset: client.options.timeZoneOffset,
      timezone_name: client.options.timeZoneName,
      selected_filters: this.filter,
    };
    return super.send(client);
  }
}

export const NOTIFICATION_FILTER_TYPES = {
  mentions: 'text_post_app_mentions',
  replies: 'text_post_app_replies',
  verified: 'verified',
} as const;
