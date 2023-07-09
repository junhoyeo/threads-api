import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT } from './utils/constants';

describe('publish', () => {
  describe('publish a post to the Threads.', () => {
    let threadsAPI: ThreadsAPI;
    let checkSum: boolean | undefined;

    beforeAll(async () => {
      console.log({
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      });
      // given
      threadsAPI = new ThreadsAPI({
        verbose: true,
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      });

      // when
      checkSum = await threadsAPI.publish('🤖 Hello World!');
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
