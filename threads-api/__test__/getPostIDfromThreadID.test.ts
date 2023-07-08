import { ThreadsAPI } from '../src/threads-api';

describe('getPostIDfromThreadID', () => {
  describe('fetching postID with ThreadID', () => {
    let threadsAPI: ThreadsAPI;
    let postID: string | undefined;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({ verbose: true });
      const threadID = 'CuX_UYABrr7';

      // when
      postID = await threadsAPI.getPostIDfromThreadID(threadID);
    });

    it('should return postID', async () => {
      // then
      expect(postID).toBe('3141257742204189435');
    });
  });
});
