import { ThreadsAPI } from '../src/threads-api';

describe('publish', () => {
  describe('publish a post to the Threads.', () => {
    let threadsAPI: ThreadsAPI;
    let checkSum: boolean | undefined;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({ verbose: true, username: "username", password: "password" });
      // when
      checkSum = await threadsAPI.publish("Hello World!");
    }, 60 * 1000);

    it('should return checkSum', async () => {
      // then
      expect(checkSum).toBe(true)
    }, 60 * 1000);
  });
});
