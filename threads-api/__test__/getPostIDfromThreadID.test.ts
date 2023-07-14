import { ThreadsAPI } from '../src/threads-api';

describe('getPostIDfromThreadID', () => {
  const threadsAPI = new ThreadsAPI({ verbose: true });

  describe('fetching postID with ThreadID', () => {
    let postID: string | undefined;

    beforeAll(async () => {
      // given
      const threadID = 'CuX_UYABrr7';

      // when
      postID = threadsAPI.getPostIDfromThreadID(threadID);
    });

    it('should return postID', async () => {
      // then
      expect(postID).toBe('3141257742204189435');
    });
  });
});
