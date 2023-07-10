import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('publish', () => {
  describe('publish a post with image to Threads.', () => {
    let threadsAPI: ThreadsAPI;
    let success: boolean = false;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({
        verbose: true,
        ...credentials,
      });

      // when
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      success = await threadsAPI.publishWithImage(
        '🤖 Hello World!',
        'https://github.com/junhoyeo/threads-py/blob/main/.github/logo.jpg?raw=true',
      );
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
