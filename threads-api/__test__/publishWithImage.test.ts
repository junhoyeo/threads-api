import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT } from './utils/constants';

describe('publish', () => {
  describe('publish a post with image to the Threads.', () => {
    let threadsAPI: ThreadsAPI;
    let checkSum: boolean | undefined;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({
        verbose: true,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      });

      // when
      checkSum = await threadsAPI.publishWithImage(
        '🤖 Hello World!',
        'https://github.com/junhoyeo/threads-py/blob/main/.github/logo.jpg?raw=true',
      );
    }, TIMEOUT);

    it(
      'should return checkSum',
      async () => {
        // then
        expect(checkSum).toBe(true);
      },
      TIMEOUT,
    );
  });
});
