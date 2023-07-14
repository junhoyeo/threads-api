import { ThreadsAPI } from '../src/threads-api';
import { TIMEOUT, credentials } from './utils/constants';
import { describeIf } from './utils/describeIf';

describeIf(!!credentials)('getTimeline', () => {
  const threadsAPI = new ThreadsAPI({
    verbose: true,
    ...credentials,
  });

  it(
    'Fetch timeline feed',
    async () => {
      // when
      let { items: threads, next_max_id } = await threadsAPI.getTimeline();
      const firstPageNextMaxID = next_max_id;
      console.log('[FIRST PAGE]', next_max_id);

      // then
      expect(Array.isArray(threads)).toBe(true);
      expect(threads[0]).toHaveProperty('thread_items');
      expect(threads[0].thread_items[0]).toHaveProperty('post');
      expect(next_max_id).toBeTruthy();

      // next page
      const res = await threadsAPI.getTimeline(next_max_id);
      threads = res.items;
      next_max_id = res.next_max_id;
      console.log('[SECOND PAGE]', next_max_id);

      expect(Array.isArray(threads)).toBe(true);
      expect(threads[0]).toHaveProperty('thread_items');
      expect(threads[0].thread_items[0]).toHaveProperty('post');

      expect(next_max_id).toBeTruthy();
      expect(next_max_id).not.toEqual(firstPageNextMaxID);
    },
    TIMEOUT,
  );
});
