import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('login', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
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
