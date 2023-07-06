import { ThreadsAPI } from '../src/threads-api';

test('getUserProfileThreads', async () => {
  // given
  const threadsAPI = new ThreadsAPI();
  const username = '_junhoyeo';
  const userID = '5438123050';

  // when
  const posts = await threadsAPI.getUserProfileThreads(username, userID);

  // then
  expect(Array.isArray(posts)).toBe(true);
  expect(posts[0]).toHaveProperty('thread_items');
  expect(posts[0].thread_items[0]).toHaveProperty('post');
});
