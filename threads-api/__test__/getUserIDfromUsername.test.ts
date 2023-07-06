import { ThreadsAPI } from '../src/threads-api';

test('getUserIDfromUsername', async () => {
  // given
  const threadsAPI = new ThreadsAPI();
  const username = '_junhoyeo';

  // when
  const userID = await threadsAPI.getUserIDfromUsername(username);

  // then
  expect(userID).toBe('5438123050');
});
