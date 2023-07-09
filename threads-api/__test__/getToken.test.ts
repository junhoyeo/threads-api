import { ThreadsAPI } from '../src/threads-api';

describe('getToken', () => {
  describe('login from instagram', () => {
    let threadsAPI: ThreadsAPI;
    let token: string | undefined;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({ verbose: true, username: 'username', password: 'password' });
      // when
      token = await threadsAPI.getToken();
    });

    it('should return token', async () => {
      // then
      expect(typeof token).toBe('string');
    });
  });
});
