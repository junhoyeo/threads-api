import axios from 'axios';
import createHttpsProxyAgent from 'https-proxy-agent';

import { ThreadsAPI } from '../src/threads-api';
import { DEVICE_ID, TIMEOUT, rawCredentials as credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('getToken', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    deviceID: DEVICE_ID,
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

  it('should use the correct proxy URL if given', async () => {
    // given
    const mockAxios = jest.spyOn(axios, 'post');
    const httpsProxyAgent = createHttpsProxyAgent({
      host: 'mocked-proxy',
    });
    const threadsAPI = new ThreadsAPI({
      verbose: true,
      deviceID: DEVICE_ID,
      httpsAgent: httpsProxyAgent,
      ...credentials,
    });

    // when
    await threadsAPI.getToken().catch(() => {});

    // then
    const call = mockAxios.mock.calls[0];
    expect(call[2]?.httpsAgent?.proxy?.host).toBe('mocked-proxy');
  });
});
