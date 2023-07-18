import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, rawCredentials as credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';
import * as HttpsProxyAgent from 'https-proxy-agent';
import dotenv from 'dotenv';

dotenv.config();

// Retrieve the proxy URL from the environment variables
const proxy = process.env.PROXY;

describeIf(!!credentials)('getToken', () => {
  const HttpsProxyAgentSpy = jest.spyOn(HttpsProxyAgent, 'HttpsProxyAgent').mockImplementation(() => {});

  const threadsAPI = new ThreadsAPI({
    verbose: true,
    httpsAgent: new HttpsProxyAgent(proxy),
    ...credentials,
  });

  describe('login from Instagram', () => {
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

  it('should use the correct agent/proxy URL', () => {
    expect(HttpsProxyAgentSpy).toHaveBeenCalledWith(proxy);
  });
});
