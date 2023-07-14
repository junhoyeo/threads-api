import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('Like/Unlike', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    ...credentials,
  });

  it(
    'Like/Unlike a Thread with User ID and Post ID',
    async () => {
      let success = false;

      // given
      const threadURL = 'https://www.threads.net/t/CugDXa1hMza';
      const postID = (await threadsAPI.getPostIDfromURL(threadURL)) || '';

      // like
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      success = await threadsAPI.like(postID);
      expect(success).toBe(true);
      success = false;

      // unlike
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      success = await threadsAPI.unlike(postID);
      expect(success).toBe(true);
      success = false;
    },
    TIMEOUT,
  );
});
