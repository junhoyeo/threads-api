import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('getToken', () => {
  describe('login from instagram', () => {
    let threadsAPI: ThreadsAPI;
    let token: string | undefined;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({
        verbose: true,
        ...credentials,
      });

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
