import * as crypto from 'crypto';
import { Client } from '../clients/visitor';
import { BLOKS_VERSION_ID } from '../constants';
import { Query, Response, toSuccessResponse } from '../core/request';
import { LATEST_ANDROID_APP_VERSION } from '../dynamic-data';

export type LoginData = { token: string; userID: string };
export type LoginError = never;

export class LoginQuery extends Query<LoginData, LoginError> {
  constructor(readonly username: string, readonly password: string) {
    super();
  }

  url = '/api/v1/bloks/apps/com.bloks.www.bloks.caa.login.async.send_login_request/';

  responseType = 'text' as const;

  async send(client: Client): Promise<Response<LoginData, LoginError>> {
    const body = new URLSearchParams({
      params: JSON.stringify({
        client_input_params: {
          device_id: client.options.deviceID,
          password: encryptPassword(this.password),
          contact_point: this.username,
        },
        server_params: {
          credential_type: 'password',
          device_id: client.options.deviceID,
        },
      }),
      bk_client_context: JSON.stringify({
        bloks_version: BLOKS_VERSION_ID,
        styles_id: 'instagram',
      }),
      bloks_versioning_id: BLOKS_VERSION_ID,
    }).toString();

    this.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': `Barcelona ${LATEST_ANDROID_APP_VERSION} Android`,
    };

    const response = await this.fetch<string>(client, {
      method: 'POST',
      data: body,
    });

    if (response.success) {
      const data = JSON.stringify(response.data.replaceAll('\\', ''));
      const token = data.split('Bearer IGT:2:')[1].split('"')[0].replaceAll('\\', '');
      const userID = data.match(/pk_id(.{18})/)![1].replaceAll(/[\\":]/g, '');

      return toSuccessResponse({ token, userID });
    }

    return response;
  }
}

const PASSWORD_KEY_ID = 149;
const PASSWORD_RSA_PK = {
  padding: crypto.constants.RSA_PKCS1_PADDING,
  key: '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqm3dP6AI0ba6pEZ1yEz+\nCl8Rmd0XNN6isvBtInTi2UHSNdUWTZN01XY4zEc4H2MMft9CFEMgAVFMoDdm52Zl\nUg9jJ+66aP1C+Grn4JRr1S53+9CGHih37B+QXQsIub8RvBIGREc4jFjR0gNBIaC9\noLHtq5uKIJM4CMQsbQ2S59iMqDVJcN+V539fMpXLqBSiQIOQNdJJm4KshYKOrQcu\nZe2sxuERCQ9+nB+Ac0r2IxyBKyyuVN4ON9utDZ1wv3EVuNu2v9P3k8nmJDKIGJQi\n1I6i4wPeNT6qIGQ7cx5Vb/DI9M5d39FRxGAUbPZieSzbxaKLr23vQCH9ixcgF3Hc\nbQIDAQAB\n-----END PUBLIC KEY-----\n',
};

// https://github.com/dilame/instagram-private-api/blob/master/src/repositories/account.repository.ts#L79
function encryptPassword(password: string) {
  const timestamp = Math.floor(Date.now() / 1000).toString();

  const aesKey = crypto.randomBytes(32);
  const aesInitVector = crypto.randomBytes(12);
  const aesCipher = crypto.createCipheriv('aes-256-gcm', aesKey, aesInitVector);
  aesCipher.setAAD(Buffer.from(timestamp));

  const aesEncryptedPassword = Buffer.concat([aesCipher.update(password, 'utf8'), aesCipher.final()]);

  const rsaEncryptedAesKey = crypto.publicEncrypt(PASSWORD_RSA_PK, aesKey);
  const rsaEncryptedAesKeySizeBuffer = Buffer.alloc(2, 0);
  rsaEncryptedAesKeySizeBuffer.writeInt16LE(rsaEncryptedAesKey.byteLength, 0);

  const aesAuthTag = aesCipher.getAuthTag();
  const encryptedPassword = Buffer.concat([
    Buffer.from([1, PASSWORD_KEY_ID]),
    aesInitVector,
    rsaEncryptedAesKeySizeBuffer,
    rsaEncryptedAesKey,
    aesAuthTag,
    aesEncryptedPassword,
  ]).toString('base64');

  return `#PWD_INSTAGRAM:4:${timestamp}:${encryptedPassword}`;
}
