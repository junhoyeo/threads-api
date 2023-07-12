import { ThreadsAPI } from '../src/threads-api';

test('getUserProfileReplies', async () => {
  // given
  const threadsAPI = new ThreadsAPI();
  const userID = '5438123050';

  // when
  const posts = await threadsAPI.getUserProfileReplies(userID);

  // then
  expect(Array.isArray(posts)).toBe(true);
  expect(posts[0]).toHaveProperty('thread_items');
  expect(posts[0].thread_items.length).toBeGreaterThanOrEqual(2);
});
