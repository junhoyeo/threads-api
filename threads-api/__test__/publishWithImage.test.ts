import { ThreadsAPI } from '../src/threads-api';

describe('publishWithImage (deprecated)', () => {
  it('Route implementation to new publish method', async () => {
    // given
    const threadsAPI = new ThreadsAPI({
      verbose: true,
      username: 'mocked-username',
      password: 'mocked-password',
      token: 'mocked-token',
    });
    const imageURL = 'https://github.com/junhoyeo/threads-py/blob/main/.github/logo.jpg?raw=true';

    const publishSpy = jest.spyOn(threadsAPI, 'publish');
    publishSpy.mockImplementation(() => Promise.resolve(true));

    // when
    await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
    await threadsAPI.publishWithImage('🤖 Hello World!', imageURL);

    // then
    expect(publishSpy).toHaveBeenCalledWith({
      text: '🤖 Hello World!',
      image: imageURL,
    });
  });
});
