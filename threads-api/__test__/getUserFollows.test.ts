import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('followers/followings', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    ...credentials,
  });

  it(
    'Fetch user followers with pagination.',
    async () => {
      // given
      const userID = '5438123050';

      // when
      let { users, next_max_id: cursor } = await threadsAPI.getUserFollowers(userID);
      const firstCursor = cursor;

      // then
      expect(users.length).toBeGreaterThan(0);
      expect(cursor).toBeTruthy();

      // next page
      ({ users, next_max_id: cursor } = await threadsAPI.getUserFollowers(userID, { maxID: cursor }));
      expect(users.length).toBeGreaterThan(0);
      expect(cursor).toBeTruthy();
      expect(cursor).not.toEqual(firstCursor);
    },
    TIMEOUT,
  );

  it(
    'Fetch user followings with pagination.',
    async () => {
      // given
      const userID = '5438123050';

      // when
      let { users, next_max_id: cursor } = await threadsAPI.getUserFollowings(userID);
      const firstCursor = cursor;

      // then
      expect(users.length).toBeGreaterThan(0);
      expect(cursor).toBeTruthy();

      // next page
      ({ users, next_max_id: cursor } = await threadsAPI.getUserFollowings(userID, { maxID: cursor }));
      expect(users.length).toBeGreaterThan(0);
      expect(cursor).toBeTruthy();
      expect(cursor).not.toEqual(firstCursor);
    },
    TIMEOUT,
  );
});
