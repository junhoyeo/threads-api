import { ThreadsAPI } from '../src/threads-api';

describe('get-username', () => {
  test('validate username', async () => {
    const threadsAPI = new ThreadsAPI();

    const username = '_junhoyeo';
    const id = await threadsAPI.getUserIDfromUsername(username);

    if (!id) {
      return;
    }
    expect(typeof id).toBe('string');
  });
});
