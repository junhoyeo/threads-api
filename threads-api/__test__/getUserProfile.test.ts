import { ThreadsAPI } from '../src/threads-api';

test('getUserProfile', async () => {
  // given
  const threadsAPI = new ThreadsAPI();
  const username = '_junhoyeo';
  const userID = '5438123050';

  // when
  const user = await threadsAPI.getUserProfile(userID);

  // then
  expect(user.username).toBe(username);
});
