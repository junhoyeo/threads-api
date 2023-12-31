import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, rawCredentials as credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('login', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    ...credentials,
  });

  it(
    'Login and publish text thread.',
    async () => {
      // given
      const text = "🤖 I'm back, Threads.";
      await threadsAPI.login();

      // when
      await new Promise((resolve) => setTimeout(resolve, 1_000)); // delay for safety
      const success = !!(await threadsAPI.publish({ text }));

      // then
      expect(success).toBe(true);
    },
    TIMEOUT,
  );
});
