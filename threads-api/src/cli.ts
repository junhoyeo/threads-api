import { program } from 'commander';
import { ThreadsAPI } from './threads-api';

const Threads = new ThreadsAPI();

program.version(require('../package.json').version, '-v, --version', 'output the current version');
program.helpOption('-h, --help', 'display help for command');

program
  .command('help')
  .description('display help for command')
  .action(() => {
    program.outputHelp();
  });

program
  .command('getUserIDfromUsername <username>')
  .alias('userid')
  .alias('uid')
  .alias('id')
  .description('get user ID from username')
  .action(async (username: string) => {
    const userId = await Threads.getUserIDfromUsername(username, { timeout: 10000 });
    console.log(`User ID for ${username}: ${userId}`);
  });

program
  .command('getUserProfile <username> <userId> [stringify]')
  .alias('userprofile')
  .alias('uprof')
  .alias('up')
  .description('get user profile')
  .action(async (username: string, userId: string, stringify?: boolean) => {
    const userProfile = await Threads.getUserProfile(username, userId, { timeout: 10000 });
    console.log(stringify ? JSON.stringify(userProfile, null, 5) : userProfile);
  });

program
  .command('getUserProfileThreads <username> <userId> [stringify]')
  .alias('uthreads')
  .alias('ut')
  .description('get user profile threads')
  .action(async (username: string, userId: string, stringify?: boolean) => {
    const userProfileThreads = await Threads.getUserProfileThreads(username, userId, { timeout: 10000 });
    console.log(stringify ? JSON.stringify(userProfileThreads, null, 5) : userProfileThreads);
  });

program
  .command('getUserProfileReplies <username> <userId> [stringify]')
  .alias('userreplies')
  .alias('ureplies')
  .alias('ur')
  .description('get user profile replies')
  .action(async (username: string, userId: string, stringify?: boolean) => {
    const userProfileReplies = await Threads.getUserProfileReplies(username, userId, { timeout: 10000 });
    console.log(stringify ? JSON.stringify(userProfileReplies, null, 5) : userProfileReplies);
  });

program
  .command('getPostIDfromURL <postURL>')
  .alias('postid')
  .alias('pid')
  .alias('p')
  .description('get post ID from URL')
  .action(async (postURL: string) => {
    const postId = await Threads.getPostIDfromURL(postURL, { timeout: 10000 });
    console.log(`Post ID for ${postURL}: ${postId}`);
  });

program
  .command('getThreads <postId> [stringify]')
  .alias('threads')
  .alias('t')
  .description('get threads')
  .action(async (postId: string, stringify?: boolean) => {
    const threads = await Threads.getThreads(postId, { timeout: 10000 });
    console.log(threads, stringify ? JSON.stringify(threads, null, 5) : threads);
  });

program
  .command('getThreadLikers <postId> [stringify]')
  .alias('threadlikers')
  .alias('likers')
  .alias('l')
  .description('get thread likers')
  .action(async (postId: string, stringify?: boolean) => {
    const threadLikers = await Threads.getThreadLikers(postId, { timeout: 10000 });
    console.log(stringify ? JSON.stringify(threadLikers, null, 5) : threadLikers);
  });

export { program };
