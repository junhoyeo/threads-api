import { ThreadsAPI } from '../src/threads-api';

test('getUserProfileThread.test', async () => {
  // given
  const threadsAPI = new ThreadsAPI();
  const username = '_junhoyeo';
  const postID = '3140623946340547898';

  // when
  const thread = await threadsAPI.getUserProfileThread(username, postID);

  // then
  expect(thread).toHaveProperty('reply_threads');
  expect(thread).toHaveProperty('containing_thread');
  expect(Array.isArray(thread.reply_threads)).toBe(true);
  expect(thread.containing_thread.id).toBe(postID);
});
