import { ThreadsAPI } from '../src/threads-api';

describe('get-threads', () => {
  test('get threads by username', async () => {
    const threadsAPI = new ThreadsAPI();

    const username = '_junhoyeo';
    const id = await threadsAPI.getUserIDfromUsername(username);

    if (!id) {
      return;
    }
    expect(typeof id).toBe('string');

    const posts = await threadsAPI.getUserProfileThreads(username, id);
    expect(Array.isArray(posts)).toBe(true);
  });
});
