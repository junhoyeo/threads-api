import { program } from 'commander';
import { ThreadsAPI } from './threads-api';

const Threads = new ThreadsAPI();
const timeout = { timeout: 10000 };

program
.version(require('../package.json').version, '-v, --version', 'output the current version')
.helpOption('-h, --help', 'display help for command');

program
.command('help')
.description('display help for command')
.action(() => program.outputHelp());

const createCommand = (commandName, description, action) => {
program
.command(commandName)
.alias(...commandName.split(' ').map((word) => word.toLowerCase().slice(0, 3)))
.description(description)
.action(action);
};

createCommand(
'getUserIDfromUsername <username>',
'get user ID from username',
async (username) => {
const userID = await Threads.getUserIDfromUsername(username, timeout);
console.log(User ID for ${username}: ${userID});
}
);

createCommand(
'getUserProfile <username> <userID> [stringify]',
'get user profile',
async (username, userID, stringify) => {
const userProfile = await Threads.getUserProfile(username, userID, timeout);
console.log(stringify ? JSON.stringify(userProfile, null, 5) : userProfile);
}
);

createCommand(
'getUserProfileThreads <username> <userID> [stringify]',
'get user profile threads',
async (username, userID, stringify) => {
    const userProfileThreads = await Threads.getUserProfileThreads(username, userID, timeout);
    console.log(stringify ? JSON.stringify(userProfileThreads, null, 5) : userProfileThreads);
  }
);

createCommand(
'getUserProfileReplies <username> <userID> [stringify]',
'get user profile replies',
async (username, userID, stringify) => {
    const userProfileReplies = await Threads.getUserProfileReplies(username, userID, timeout);
    console.log(stringify ? JSON.stringify(userProfileReplies, null, 5) : userProfileReplies);
  }
);

createCommand(
'getPostIDfromURL <postURL>',
'get post ID from URL',
async (postURL) => {
    const postID = await Threads.getPostIDfromURL(postURL, timeout);
    console.log(Post ID for ${postURL}: ${postID});
  }
);

createCommand(
'getThreads <postID> [stringify]',
'get threads',
async (postID, stringify) => {
    const threads = await Threads.getThreads(postID, timeout);
    console.log(threads, stringify ? JSON.stringify(threads, null, 5) : threads);
  }
);

createCommand(
'getThreadLikers <postID> [stringify]',
'get thread likers',
async (postID, stringify) => {
    const threadLikers = await Threads.getThreadLikers(postID, timeout);
    console.log(stringify ? JSON.stringify(threadLikers, null, 5) : threadLikers);
  }
);

export { program };