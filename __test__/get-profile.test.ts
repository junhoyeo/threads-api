import { ThreadsAPI } from '../src/threads-api';

describe('get-profile', () => {
  test('get profile by username', async () => {
    const threadsAPI = new ThreadsAPI();

    const username = '_junhoyeo';
    const id = await threadsAPI.getUserIDfromUsername(username);

    if (!id) {
      return;
    }
    expect(typeof id).toBe('string');

    const user = await threadsAPI.getUserProfile(username, id);
    expect(user.username).toBe(username);
  });
});
