import { ThreadsAPI } from '../src/threads-api';

test('getThreads', async () => {
  // given
  const threadsAPI = new ThreadsAPI();
  const postID = '3140957200974444958'; // https://www.threads.net/t/CuW6-7KyXme

  // when
  const thread = await threadsAPI.getThreads(postID);

  // then
  expect(thread).toHaveProperty('reply_threads');
  expect(thread).toHaveProperty('containing_thread');
  expect(thread.containing_thread.id).toBe(postID);
  expect(Array.isArray(thread.reply_threads)).toBe(true);

  // hope we don't remove those threads!
  const containingThreadCaptions = thread.containing_thread.thread_items.map((v) => v.post.caption?.text);
  expect(containingThreadCaptions).toEqual(
    expect.arrayContaining([
      'This is fast. Could be made into a Mastodon API bridge like Skybridge (for Bluesky)',
      'For context, this is Skybridge https://skybridge.fly.dev/',
    ]),
  );

  const replyThreadCaptions = thread.reply_threads
    ?.map((v) => v.thread_items.map((v) => v.post.caption?.text))
    .flat();
  expect(replyThreadCaptions).toEqual(expect.arrayContaining(['🤍💙🤍💙💙']));
});
