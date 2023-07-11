import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('publish', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  });

  describe('Publish a text post to Threads.', () => {
    let success: boolean = false;

    beforeAll(async () => {
      // when
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      success = !!(await threadsAPI.publish('🤖 Hello World!'));
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

  it(
    'Publish a text post to Threads with an image.',
    async () => {
      // given
      const text = '🤖 Hello World!';
      const imageURL = 'https://github.com/junhoyeo/threads-api/blob/main/.github/logo.jpg?raw=true';

      // when
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      const success = !!(await threadsAPI.publish({ text, image: imageURL }));

      // then
      expect(success).toBe(true);
    },
    TIMEOUT,
  );

  it(
    'Publish a text post to Threads with an URL attrachment.',
    async () => {
      // given
      const text = '🤖 Hello World!';
      const imageURL = 'https://github.com/junhoyeo/threads-api';

      // when
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      const success = !!(await threadsAPI.publish({ text, url: imageURL }));

      // then
      expect(success).toBe(true);
    },
    TIMEOUT,
  );
});
