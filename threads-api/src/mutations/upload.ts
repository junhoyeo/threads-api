import axios from 'axios';
import { randomUUID } from 'crypto';
import * as mimeTypes from 'mrmime';
import { PrivateClient } from '../clients/private';
import { Mutation } from '../core/request';
import { nextUploadID } from '../core/uploads';
import { ThreadsAPI } from '../types/public';

export type UploadData = { upload_id: string };
export type UploadError = never;

/**
 * Note that the `url`, `entityName` and `uploadID` properties won't be defined
 * until the request is sent (unless you provide an `uploadID` to the
 * constructor).
 */
export class UploadImageMutation extends Mutation<UploadData, UploadError> {
  declare url: string;
  declare entityName: string;
  declare uploadID: string;

  baseURL = 'https://www.instagram.com';
  responseType = 'json' as const;

  constructor(readonly image: ThreadsAPI.Image, uploadID?: string) {
    super();
    if (uploadID) {
      this.setUploadID(uploadID);
    }
  }

  protected setUploadID(uploadID: string) {
    const nonce = Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000);
    this.uploadID = uploadID;
    this.entityName = `${uploadID}_0_${nonce}`;
    this.url = '/rupload_igphoto/' + this.entityName;
  }

  async send(client: PrivateClient) {
    let imageBuffer: Buffer | ArrayBuffer;
    let mimeType: string | undefined;

    const { image } = this;
    if (typeof image === 'string' || 'path' in image) {
      const imagePath = typeof image === 'string' ? image : image.path;
      const isFilePath = !imagePath.startsWith('http');
      if (isFilePath) {
        const fs = await import('fs');
        imageBuffer = await fs.promises.readFile(imagePath);
        mimeType = mimeTypes.lookup(imagePath)!;
      } else {
        const response = await axios.get(imagePath, {
          responseType: 'arraybuffer',
        });
        imageBuffer = response.data;
        mimeType = response.headers['Content-Type'] as string | undefined;
      }
    } else {
      imageBuffer = image.data;
      mimeType = image.type.includes('/') ? image.type : mimeTypes.lookup(image.type)!;
    }

    if (this.uploadID == null) {
      this.setUploadID(nextUploadID());
    }

    const contentLength = imageBuffer.byteLength.toString();

    this.headers = {
      X_FB_PHOTO_WATERFALL_ID: randomUUID(),
      'X-Entity-Type': mimeType || 'image/jpeg',
      Offset: '0',
      'X-Instagram-Rupload-Params': JSON.stringify({
        upload_id: this.uploadID,
        media_type: '1',
        sticker_burnin_params: JSON.stringify([]),
        image_compression: JSON.stringify({ quality: '0' }),
        xsharing_user_ids: JSON.stringify([]),
        retry_context: JSON.stringify({
          num_step_auto_retry: '0',
          num_reupload: '0',
          num_step_manual_retry: '0',
        }),
        'IG-FB-Xpost-entry-point-v2': 'feed',
      }),
      'X-Entity-Name': this.entityName,
      'X-Entity-Length': contentLength,
      'Content-Length': contentLength,
      'Accept-Encoding': 'gzip',
    };

    this.bodyType = 'buffer';
    this.body = imageBuffer;

    return super.send(client, {
      timeout: 60e3,
    });
  }
}

/** @internal */
export function uploadImage(client: PrivateClient, image: ThreadsAPI.Image, uploadID?: string) {
  return client.send(UploadImageMutation, image, uploadID);
}
