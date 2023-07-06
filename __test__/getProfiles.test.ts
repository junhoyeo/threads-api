import { ThreadsAPI } from '../src/threads-api';

test("UserName Unit test", async () => {
  const threadsAPI = new ThreadsAPI();

  const username = '_junhoyeo';
  const id = await threadsAPI.getUserIDfromUsername(username);

  if (!id) {
    return;
  }
  expect(typeof id).toBe("string");

  const user = await threadsAPI.getUserProfile(username, id);
  expect(user.username).toBe(username);

  const posts = await threadsAPI.getUserProfileThreads(username, id);
  expect(Array.isArray(posts)).toBe(true)
});