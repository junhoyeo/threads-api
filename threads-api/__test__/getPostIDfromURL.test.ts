import { ThreadsAPI } from '../src/threads-api';

describe('getPostIDfromURL', () => {
  const threadsAPI = new ThreadsAPI({ verbose: true });

  describe('fetching postID with postURL', () => {
    let postID: string | undefined;

    beforeAll(async () => {
      // given
      const postURL = 'https://www.threads.net/t/CuX_UYABrr7/?igshid=MzRlODBiNWFlZA==';

      // when
      postID = await threadsAPI.getPostIDfromURL(postURL);
    });

    it('should return postID', async () => {
      // then
      expect(postID).toBe('3141257742204189435');
    });
  });
});
