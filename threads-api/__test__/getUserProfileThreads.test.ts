import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

test('getUserProfileThreads (without auth)', async () => {
  // given
  const threadsAPI = new ThreadsAPI();
  const userID = '5438123050';

  // when
  const posts = await threadsAPI.getUserProfileThreads(userID);

  // then
  expect(Array.isArray(posts)).toBe(true);
  expect(posts[0]).toHaveProperty('thread_items');
  expect(posts[0].thread_items[0]).toHaveProperty('post');
});

describeIf(!!credentials)('getUserProfileThreadsLoggedIn (with auth)', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    token: process.env.TOKEN,
  });

  it(
    'Fetch user threads with pagination.',
    async () => {
      // given
      const userID = '5438123050';

      // when
      let { threads, next_max_id } = await threadsAPI.getUserProfileThreadsLoggedIn(userID);
      const firstPageNextMaxID = next_max_id;
      console.log('[FIRST PAGE]', next_max_id);

      // then
      expect(Array.isArray(threads)).toBe(true);
      expect(threads[0]).toHaveProperty('thread_items');
      expect(threads[0].thread_items[0]).toHaveProperty('post');
      expect(next_max_id).toBeTruthy();

      // next page
      const res = await threadsAPI.getUserProfileThreadsLoggedIn(userID);
      threads = res.threads;
      next_max_id = res.next_max_id;
      console.log('[SECOND PAGE]', next_max_id);

      expect(Array.isArray(threads)).toBe(true);
      expect(threads[0]).toHaveProperty('thread_items');
      expect(threads[0].thread_items[0]).toHaveProperty('post');

      expect(next_max_id).toBeTruthy();
      expect(next_max_id).not.toEqual(firstPageNextMaxID);
    },
    TIMEOUT,
  );
});
