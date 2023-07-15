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
    const userID = await Threads.getUserIDfromUsername(username, { timeout: 10000 });
    console.log(`User ID for ${username}: ${userID}`);
  });

program
  .command('getUserProfile <username> <userID> [stringify]')
  .alias('userprofile')
  .alias('uprof')
  .alias('up')
  .description('get user profile')
  .action(async (username: string, userID: string, stringify?: boolean) => {
    const userProfile = await Threads.getUserProfile(username, userID, { timeout: 10000 });
    console.log(stringify ? JSON.stringify(userProfile, null, 5) : userProfile);
  });

program
  .command('getUserProfileThreads <username> <userID> [stringify]')
  .alias('uthreads')
  .alias('ut')
  .description('get user profile threads')
  .action(async (username: string, userID: string, stringify?: boolean) => {
    const userProfileThreads = await Threads.getUserProfileThreads(username, userID, { timeout: 10000 });
    console.log(stringify ? JSON.stringify(userProfileThreads, null, 5) : userProfileThreads);
  });

program
  .command('getUserProfileReplies <username> <userID> [stringify]')
  .alias('userreplies')
  .alias('ureplies')
  .alias('ur')
  .description('get user profile replies')
  .action(async (username: string, userID: string, stringify?: boolean) => {
    const userProfileReplies = await Threads.getUserProfileReplies(username, userID, { timeout: 10000 });
    console.log(stringify ? JSON.stringify(userProfileReplies, null, 5) : userProfileReplies);
  });

program
  .command('getPostIDfromURL <postURL>')
  .alias('postid')
  .alias('pid')
  .alias('p')
  .description('get post ID from URL')
  .action(async (postURL: string) => {
    const postID = Threads.getPostIDfromURL(postURL);
    console.log(`Post ID for ${postURL}: ${postID}`);
  });

program
  .command('getThreads <postID> [stringify]')
  .alias('threads')
  .alias('t')
  .description('get threads')
  .action(async (postID: string, stringify?: boolean) => {
    const threads = await Threads.getThreads(postID, { timeout: 10000 });
    console.log(threads, stringify ? JSON.stringify(threads, null, 5) : threads);
  });

program
  .command('getThreadLikers <postID> [stringify]')
  .alias('threadlikers')
  .alias('likers')
  .alias('l')
  .description('get thread likers')
  .action(async (postID: string, stringify?: boolean) => {
    const threadLikers = await Threads.getThreadLikers(postID, { timeout: 10000 });
    console.log(stringify ? JSON.stringify(threadLikers, null, 5) : threadLikers);
  });

export { program };
