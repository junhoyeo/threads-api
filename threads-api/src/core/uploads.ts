import { Client } from '../clients/visitor';

let lastUploadID = 0;

// Avoid upload_id collisions.
export function nextUploadID() {
  const now = Date.now();
  return (lastUploadID = now < lastUploadID ? lastUploadID + 1 : now).toString();
}

export const createUploadMetadata = (client: Client, uploadID = nextUploadID()) => ({
  upload_id: uploadID,
  source_type: '4',
  timezone_offset: client.options.timeZoneOffset,
  device: client.options.device,
});
