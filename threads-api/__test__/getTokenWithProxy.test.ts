import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, rawCredentials as credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';
import * as HttpsProxyAgent from "https-proxy-agent";

// Proxy server details
var proxy = 'http://PROXYUSERNAME:PROXYPWD@PROXYHOST:PROXYPORT';

describeIf(!!credentials)('getToken', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    httpsAgent: new HttpsProxyAgent.HttpsProxyAgent(proxy),
    ...credentials,
  });

  describe('login from instagram', () => {
    let token: string | undefined;

    beforeAll(async () => {
      // when
      token = await threadsAPI.getToken();
    }, TIMEOUT);

    it(
      'should return token',
      async () => {
        // then
        expect(typeof token).toBe('string');
      },
      TIMEOUT,
    );
  });
});
