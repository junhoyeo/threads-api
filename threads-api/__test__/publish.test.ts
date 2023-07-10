import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('publish', () => {
  describe('publish a text post to Threads.', () => {
    let threadsAPI: ThreadsAPI;
    let success: boolean = false;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({
        verbose: true,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      });

      // when
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      success = await threadsAPI.publish('🤖 Hello World!');
    }, TIMEOUT);

    it(
      'should return success',
      async () => {
        // then
        expect(success).toBe(true);
      },
      TIMEOUT,
    );
  });
});
