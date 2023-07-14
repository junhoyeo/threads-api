import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('getToken', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
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
