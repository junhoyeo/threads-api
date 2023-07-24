import { ThreadsAPI } from '../src/threads-api';
import { credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

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

describeIf(!!credentials)('getUserProfile (with auth)', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    ...credentials,
  });

  it('Instagram # number to join Threads (#164)', async () => {
    // given
    const userID = await threadsAPI.getUserIDfromUsername('zuck');

    // when
    const user = await threadsAPI.getUserProfileLoggedIn(userID!);
    console.log(JSON.stringify(user));
  });
});
