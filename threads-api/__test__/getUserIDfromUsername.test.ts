import axios from 'axios';
import { ThreadsAPI } from '../src/threads-api';

describe('getUserIDfromUsername', () => {
  describe('fetching userID for username', () => {
    let threadsAPI: ThreadsAPI;
    let userID: string | undefined;
    let previousLSDToken: string;

    beforeAll(async () => {
      // given
      threadsAPI = new ThreadsAPI({ verbose: true });
      const username = '_junhoyeo';
      threadsAPI.fbLSDToken = 'mocked-default-lsd-token';
      previousLSDToken = threadsAPI.fbLSDToken;

      // when
      userID = await threadsAPI.getUserIDfromUsername(username);
    });

    it('should return userID', async () => {
      // then
      expect(userID).toBe('5438123050');
    });

    describe('after execution', () => {
      it('should update LSD token', async () => {
        // then
        expect(threadsAPI.fbLSDToken).not.toBe(previousLSDToken);
      });

      it('should use updated LSD for future requests', async () => {
        // given — mock axios
        const mockAxios = jest.spyOn(axios, 'post');
        const latestLSDToken = threadsAPI.fbLSDToken;

        // when
        await threadsAPI.getUserProfile('_junhoyeo', '5438123050');

        // then
        const call = mockAxios.mock.calls[0];
        const lsd = (call[1] as URLSearchParams | undefined)?.get('lsd');
        if (!lsd) {
          throw new Error('lsd is undefined');
        }
        expect(lsd).toBe(latestLSDToken);
        expect(lsd).not.toBe(previousLSDToken);
      });
    });
  });
});
