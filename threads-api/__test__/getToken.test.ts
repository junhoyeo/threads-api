import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT } from './utils/constants';

describe('getToken', () => {
  describe('login from instagram', () => {
    let threadsAPI: ThreadsAPI;
    let token: string | undefined;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({
        verbose: true,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
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
