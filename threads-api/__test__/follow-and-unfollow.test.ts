import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('Follow/Unfollow', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
  });

  it(
    'Follow/Unfollow a Thread with User ID and Post ID',
    async () => {
      let success = false;

      // given
      const userID = (await threadsAPI.getUserIDfromUsername('junhoyeo')) || '';

      // follow
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      success = (await threadsAPI.follow(userID)).status === 'ok';
      expect(success).toBe(true);
      success = false;

      // unfollow
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      success = (await threadsAPI.unfollow(userID)).status === 'ok';
      expect(success).toBe(true);
      success = false;

      // follow me back thanks! lol
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      success = (await threadsAPI.follow(userID)).status === 'ok';
      expect(success).toBe(true);
      success = false;
    },
    TIMEOUT,
  );
});
