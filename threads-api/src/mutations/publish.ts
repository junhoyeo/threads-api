import { PrivateClient } from '../clients/private';
import { REPLY_CONTROL_OPTIONS } from '../constants';
import { Mutation } from '../core/request';
import { createUploadMetadata, nextUploadID } from '../core/uploads';
import { ThreadsAPI } from '../types/public';
import { uploadImage } from './upload';

export type PublishData = { media: { id: string } };
export type PublishError = never;

export class PublishMutation extends Mutation<PublishData, PublishError> {
  readonly url: string;
  readonly uploadID = nextUploadID();
  bodyType = 'signed-json' as const;
  responseType = 'json' as const;

  constructor(readonly options: PublishMutation.Options) {
    super();

    this.url =
      (options.attachment &&
        (options.attachment.image
          ? '/api/v1/media/configure_text_post_app_feed/'
          : options.attachment.sidecar
          ? '/api/v1/media/configure_text_post_app_sidecar/'
          : null)) ||
      '/api/v1/media/configure_text_only_post/';
  }

  async send(client: PrivateClient) {
    const {
      text: caption = '',
      replyControl = 'everyone',
      attachment,
      parentPostID,
      quotedPostID,
    } = this.options;

    let mediaMetadata: any;
    if (attachment) {
      if (attachment.image) {
        const uploadResult = await uploadImage(client, attachment.image, this.uploadID);
        if (!uploadResult.success) {
          uploadResult.error.message = `Failed to upload image: ${uploadResult.error.message}`;
          return uploadResult;
        }

        mediaMetadata = {
          scene_type: null,
          scene_capture_type: '',
        };
      } else if (attachment.sidecar) {
        const children: any[] = [];
        for (let i = 0; i < attachment.sidecar.length; i++) {
          const image = attachment.sidecar[i];

          // Images are uploaded one at a time, just like the app does.
          const uploadResult = await uploadImage(client, image);
          if (!uploadResult.success) {
            uploadResult.error.message = `Failed to upload image at index ${i}: ${uploadResult.error.message}`;
            return uploadResult;
          }

          children.push({
            ...createUploadMetadata(client, uploadResult.data.upload_id),
            scene_type: null,
            scene_capture_type: '',
          });

          this.options.onProgress?.({
            uploaded: children.length,
            total: attachment.sidecar.length,
          });
        }

        mediaMetadata = {
          client_sidecar_id: this.uploadID,
          children_metadata: children,
        };
      }
    }

    this.bodyType = 'signed-json';
    this.body = {
      ...createUploadMetadata(client, this.uploadID),
      ...mediaMetadata,
      publish_mode: !mediaMetadata ? 'text_post' : undefined,
      text_post_app_info: {
        reply_control: REPLY_CONTROL_OPTIONS[replyControl],
        reply_id: parentPostID ? stripTrailingUserID(parentPostID) : undefined,
        quoted_post_id: quotedPostID ? stripTrailingUserID(quotedPostID) : undefined,
        link_attachment_url: attachment?.url,
      },
      _uid: client.options.userID,
      device_id: client.options.deviceID,
      caption,
    };

    return super.send(client);
  }
}

export declare namespace PublishMutation {
  interface Options {
    text?: string;
    replyControl?: ThreadsAPI.ReplyControl;
    parentPostID?: string;
    quotedPostID?: string;
    attachment?: ThreadsAPI.PostAttachment;
    /**
     * Receive updates as an `attachment.sidecar` has its images uploaded.
     */
    onProgress?: (progress: ThreadsAPI.PublishProgressEvent) => void;
  }
}

function stripTrailingUserID(id: string) {
  return id.replace(/_\d+$/, '');
}
