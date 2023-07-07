import { ThreadsAPI } from '../src/threads-api';

test('getThreadLikers', async () => {
    // given
    const threadsAPI = new ThreadsAPI();
    const postID = '3141675920411513399';

    // when
    const likers = await threadsAPI.getThreadLikers(postID);

    // then
    expect(Array.isArray(likers.users)).toBe(true);
    expect(likers.users[0]).toHaveProperty('pk');
    expect(likers.users[0]).toHaveProperty('full_name');
})