import { REPLY_CONTROL_OPTIONS } from '../constants';
import { StrictUnion } from './utils';

export declare namespace ThreadsAPI {
  type Image = string | ExternalImage | RawImage;

  type ExternalImage = {
    path: string;
  };

  type RawImage = {
    type: string;
    data: Buffer;
  };

  type ReplyControl = keyof typeof REPLY_CONTROL_OPTIONS;

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

  type PublishProgressEvent = {
    uploaded: number;
    total: number;
  };

  type Story = {
    story_type: number;
    type: number;
    args: StoryArgs;
    counts: any[];
    pk: string;
  };

  type StoryArgs = {
    extra_actions?: string[] | null;
    profile_id: number;
    profile_name: string;
    profile_image: string;
    profile_image_destination: string;
    destination: string;
    rich_text: string;
    extra: StoryExtra;
    actions?: string[] | null;
    inline_controls?: StoryInlineControls[] | null;
    timestamp: number;
    tuuid: string;
    clicked: boolean;
    af_candidate_id: number;
  };

  type StoryExtra = {
    title: string;
    is_aggregated: boolean;
    icon_name: string;
    icon_color: string;
    icon_url: string;
    context: string;
    content: string;
  };

  type StoryInlineControls = {
    action_type: string;
  };
}

export interface AndroidDevice {
  manufacturer: string;
  model: string;
  os_version: number;
  os_release: string;
}
