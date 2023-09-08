# [<img src="https://github.com/junhoyeo/threads-api/raw/main/.github/logo.jpg" width="36" height="36" />](https://github.com/junhoyeo) Threads API

[![NPM](https://img.shields.io/npm/v/threads-api.svg?style=flat-square&labelColor=black)](https://www.npmjs.com/package/threads-api) [![MIT License](https://img.shields.io/badge/license-MIT-blue?style=flat-square&labelColor=black)](https://github.com/junhoyeo/threads-api/blob/main/LICENSE) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg?style=flat-square&labelColor=black)](https://prettier.io)

> Unofficial, Reverse-Engineered Node.js/TypeScript client for Meta's [Threads](https://threads.net).

## [<img src="https://github.com/junhoyeo/threads-api/raw/main/.github/emojis/rocket.png" width="30" height="30" />](https://github.com/junhoyeo) `threads-api` in Action

<p align="center">
  <a href="https://threads.junho.io/">
  <img src="https://raw.githubusercontent.com/junhoyeo/threads-api/main/threads-web-ui/app/opengraph-image.jpg?v=2" alt="cover" width="700px" />
  </a>
</p>

> ✨ The [App Registry](https://threads.junho.io/apps) is officially live! We invite you to explore it on our website at [threads.junho.io](https://threads.junho.io). <br/>
> Modify [threads-web-ui/data/apps.ts](https://github.com/junhoyeo/threads-api/blob/main/threads-web-ui/data/apps.ts) to add your projects!

<p align="center">
  <a href="https://github.com/junhoyeo">
    <img src="https://github.com/junhoyeo/threads-api/raw/main/.github/cover.jpg" alt="cover" width="500px" />
  </a>
</p>

### 🚀 Usage (Read)

<details>
<summary><h4>Read: Public</h4></summary>

```ts
import { ThreadsAPI } from 'threads-api';

// or in Deno 🦖:
// import ThreadsAPI from "npm:threads-api";

const main = async () => {
  const threadsAPI = new ThreadsAPI();

  const username = '_junhoyeo';

  // 👤 Details for a specific user
  const userID = await threadsAPI.getUserIDfromUsername(username);
  if (!userID) {
    return;
  }
  const user = await threadsAPI.getUserProfile(userID);
  console.log(JSON.stringify(user));
  const posts = await threadsAPI.getUserProfileThreads(userID);
  console.log(JSON.stringify(posts));
  const replies = await threadsAPI.getUserProfileReplies(userID);
  console.log(JSON.stringify(replies));

  // 📖 Details for a specific thread
  const postID = threadsAPI.getPostIDfromURL(
    'https://www.threads.net/t/CuX_UYABrr7/?igshid=MzRlODBiNWFlZA==',
  );
  // or use `threadsAPI.getPostIDfromThreadID('CuX_UYABrr7')`
  if (!postID) {
    return;
  }
  const post = await threadsAPI.getThreads(postID);
  console.log(JSON.stringify(post.containing_thread));
  console.log(JSON.stringify(post.reply_threads));

  const likers = await threadsAPI.getThreadLikers(postID);
  console.log(JSON.stringify(likers));
};
main();
```

</details>

#### Read: Private(Auth Required)

##### 💡 Get User Profile (from v1.6.2)

- `getUserProfile` but with auth

```ts
const userID = '5438123050';
const { user } = await threadsAPI.getUserProfileLoggedIn();
console.log(JSON.stringify(user));
```

##### 💡 Get Timeline

```ts
const { items: threads, next_max_id: cursor } = await threadsAPI.getTimeline();
console.log(JSON.stringify(threads));
```

##### 💡 Get Threads/Replies from a User (with pagination)

```ts
const { threads, next_max_id: cursor } = await threadsAPI.getUserProfileThreadsLoggedIn(userID);
console.log(JSON.stringify(threads));
```

```ts
const { threads, next_max_id: cursor } = await threadsAPI.getUserProfileRepliesLoggedIn(userID);
console.log(JSON.stringify(threads));
```

##### 💡 Get Followers/Followings of a User (with Pagination)

```ts
const { users, next_max_id: cursor } = await threadsAPI.getUserFollowers(userID);
console.log(JSON.stringify(users));
```

```ts
const { users, next_max_id: cursor } = await threadsAPI.getUserFollowings(userID);
console.log(JSON.stringify(users));
```

##### 💡 Get Details(with Following Threads) for a specific Thread (from v1.6.2)

- `getThreads` but with auth (this will return more data)

```ts
let data = await threadsAPI.getThreadsLoggedIn(postID);
console.log(JSON.stringify(data.containing_thread));
console.log(JSON.stringify(data.reply_threads));
console.log(JSON.stringify(data.subling_threads));

if (data.downwards_thread_will_continue) {
  const cursor = data.paging_tokens.downward;
  data = await threadsAPI.getThreadsLoggedIn(postID, cursor);
}
```

##### 🔔 Get Notifications (from v1.6.2)

```ts
let data = await threadsAPI.getNotifications(
  ThreadsAPI.NotificationFilter.MENTIONS, // {MENTIONS, REPLIES, VERIFIED}
);

if (!data.is_last_page) {
  const cursor = data.next_max_id;
  data = await threadsAPI.getNotifications(ThreadsAPI.NotificationFilter.MENTIONS, cursor);
}
```

##### 💎 Get Recommended Users (from v1.6.2)

```ts
let data = await threadsAPI.getRecommendedUsers();
console.log(JSON.stringify(data.users)); // ThreadsUser[]

if (data.has_more) {
  const cursor = data.paging_token;
  data = await threadsAPI.getRecommendedUsers(cursor);
}
```

##### 🔍 Search Users (from v1.6.2)

```ts
const query = 'zuck';
const count = 40; // default value is set to 30
const data = await threadsAPI.searchUsers(query, count);

console.log(JSON.stringify(data.num_results));
console.log(JSON.stringify(data.users)); // ThreadsUser[]
```

### 🚀 Usage (Write)

> **Note**<br />
> From v1.4.0, you can **also** call `login` to update your `token` and `userID`(for current credentials). Or you can just use the methods below, and they'll take care of the authentication automatically (e.g. if it's the first time you're using those).

#### New API (from v1.2.0)

##### ✨ Text Threads

```ts
import { ThreadsAPI } from 'threads-api';

const main = async () => {
  const threadsAPI = new ThreadsAPI({
    username: '_junhoyeo', // Your username
    password: 'PASSWORD', // Your password
  });

  await threadsAPI.publish({
    text: '🤖 Hello World',
  });
};

main();
```

<p align="center">
  <a href="https://www.threads.net/t/CucsGvZBs9q">
    <img src="https://github.com/junhoyeo/threads-api/raw/main/.github/text-threads.jpg" alt="Writing Text Threads" width="400px" />
  </a>
</p>

> **💡 TIP**: Use the [`url` field in `ThreadsAPIPublishOptions` to render Link Attachments(link previews).](https://github.com/junhoyeo/threads-api#-threads-with-link-attachment)

###### ✨ Reply Control (from v1.4.6)

```ts
await threadsAPI.publish({
  text: '🤖 Threads with Reply Control',
  replyControl: 'accounts_you_follow', // 'everyone' | 'accounts_you_follow' | 'mentioned_only'
});
```

##### ✨ Threads with Link Attachment

```ts
await threadsAPI.publish({
  text: '🤖 Threads with Link Attachment',
  attachment: {
    url: 'https://github.com/junhoyeo/threads-api',
  },
});
```

##### ✨ Threads with Image

```ts
await threadsAPI.publish({
  text: '🤖 Threads with Image',
  attachment: {
    image: 'https://github.com/junhoyeo/threads-api/raw/main/.github/cover.jpg',
  },
});
```

`ThreadsAPI.Image` in `attachment.image` can also be type of `ThreadsAPI.ExternalImage` or `ThreadsAPI.RawImage`.

##### ✨ Threads with Sidecar (Multiple Images)

> **Info** <br />
> The term _"sidecar"_ is what Threads uses to represent a group of images and/or videos that share the same post.

```ts
await threadsAPI.publish({
  text: '🤖 Threads with Sidecar',
  attachment: {
    sidecar: [
      'https://github.com/junhoyeo/threads-api/raw/main/.github/cover.jpg',
      'https://github.com/junhoyeo/threads-api/raw/main/.github/cover.jpg',
      { path: './zuck.jpg' }, // ThreadsAPI.ExternalImage
      { type: '.jpg', data: Buffer.from(…) }, // ThreadsAPI.RawImage
    ],
  },
});
```

##### ✨ Reply to Other Threads

```ts
const parentURL = 'https://www.threads.net/t/CugF-EjhQ3r';
const parentPostID = threadsAPI.getPostIDfromURL(parentURL); // or use `getPostIDfromThreadID`

await threadsAPI.publish({
  text: '🤖 Beep',
  link: 'https://github.com/junhoyeo/threads-api',
  parentPostID: parentPostID,
});
```

<p align="center">
  <a href="https://www.threads.net/t/CugF-EjhQ3r">
    <img src="https://github.com/junhoyeo/threads-api/raw/main/.github/rich-threads.png" alt="Writing Text Threads" width="400px" />
  </a>
</p>

##### ✨ Quote a Thread (from v1.4.2)

```ts
const threadURL = 'https://www.threads.net/t/CuqbBI8h19H';
const postIDToQuote = threadsAPI.getPostIDfromURL(threadURL); // or use `getPostIDfromThreadID`

await threadsAPI.publish({
  text: '🤖 Quote a Thread',
  quotedPostID: postIDToQuote,
});
```

##### ✨ Like/Unlike a Thread (from v1.3.0)

```ts
const threadURL = 'https://www.threads.net/t/CugK35fh6u2';
const postIDToLike = threadsAPI.getPostIDfromURL(threadURL); // or use `getPostIDfromThreadID`

// 💡 Uses current credentials
await threadsAPI.like(postIDToLike);
await threadsAPI.unlike(postIDToLike);
```

##### ✨ Follow/Unfollow a User (from v1.3.0)

```ts
const userIDToFollow = await threadsAPI.getUserIDfromUsername('junhoyeo');

// 💡 Uses current credentials
await threadsAPI.follow(userIDToFollow);
await threadsAPI.unfollow(userIDToFollow);
```

##### ✨ Repost/Unrepost a Thread (from v1.4.2)

```ts
const threadURL = 'https://www.threads.net/t/CugK35fh6u2';
const postIDToRepost = threadsAPI.getPostIDfromURL(threadURL); // or use `getPostIDfromThreadID`

// 💡 Uses current credentials
await threadsAPI.repost(postIDToRepost);
await threadsAPI.unrepost(postIDToRepost);
```

##### ✨ Delete a Post (from v1.3.1)

```ts
const postID = await threadsAPI.publish({
  text: '🤖 This message will self-destruct in 5 seconds.',
});

await new Promise((resolve) => setTimeout(resolve, 5_000));
await threadsAPI.delete(postID);
```

##### 🔇 Mute/Unmute a User/Post (from v1.6.2)

```ts
const userID = await threadsAPI.getUserIDfromUsername('zuck');
const threadURL = 'https://www.threads.net/t/CugK35fh6u2';
const postID = threadsAPI.getPostIDfromURL(threadURL); // or use `getPostIDfromThreadID`

// 💡 Uses current credentials

// Mute User
await threadsAPI.mute({ userID });
await threadsAPI.unfollow({ userID });

// Mute a Post of User
await threadsAPI.mute({ userID, postID });
await threadsAPI.unfollow({ userID, postID });
```

##### 🔇 Block/Unblock a User (from v1.6.2)

```ts
const userID = await threadsAPI.getUserIDfromUsername('zuck');

// 💡 Uses current credentials
await threadsAPI.block({ userID });
await threadsAPI.unblock({ userID });
```

##### 🔔 Set Notifications Seen (from v1.6.2)

```ts
// 💡 Uses current credentials
await threadsAPI.setNotificationsSeen();
```

<details>
  <summary>
  <h3>🏚️ Old API (Deprecated from v1.5.0, Still works for backwards compatibility)</h3>
  <blockquote><code>image</code> and <code>url</code> options in <code>publish</code></blockquote>
  </summary>

##### ✨ Threads with Image

```ts
await threadsAPI.publish({
  text: '🤖 Threads with Image',
  image: 'https://github.com/junhoyeo/threads-api/raw/main/.github/cover.jpg',
});
```

##### ✨ Threads with Link Attachment

```ts
await threadsAPI.publish({
  text: '🤖 Threads with Link Attachment',
  url: 'https://github.com/junhoyeo/threads-api',
});
```

</details>

<details>
  <summary>
    <h3>🏚️ Old API (Deprecated from v1.2.0, Still works for backwards compatibility)</h3>
    <blockquote>Single <code>string</code> argument in <code>publish</code></blockquote>
  </summary>

```ts
import { ThreadsAPI } from 'threads-api';

const main = async () => {
  const threadsAPI = new ThreadsAPI({
    username: 'jamel.hammoud', // Your username
    password: 'PASSWORD', // Your password
  });

  await threadsAPI.publish('🤖 Hello World');
};

main();
```

You can also provide custom `deviceID` (Default is `android-${(Math.random() * 1e24).toString(36)}`).

```ts
const deviceID = `android-${(Math.random() * 1e24).toString(36)}`;

const threadsAPI = new ThreadsAPI({
  username: 'jamel.hammoud',
  password: 'PASSWORD',
  deviceID,
});
```

</details>

## [<img src="https://github.com/junhoyeo/threads-api/raw/main/.github/emojis/package.png" width="30" height="30" />](https://github.com/junhoyeo) Installation

```bash
yarn add threads-api
# or with npm
npm install threads-api
# or with pnpm
pnpm install threads-api
```

```typescript
// or in Deno 🦖
import ThreadsAPI from 'npm:threads-api';

const threadsAPI = new ThreadsAPI.ThreadsAPI({});
```

## [<img src="https://github.com/junhoyeo/threads-api/raw/main/.github/emojis/pushpin.png" width="30" height="30" />](https://github.com/junhoyeo) Roadmap

- [x] ✅ Read public data
  - [x] ✅ Fetch UserID(`314216`) via username(`zuck`)
  - [x] ✅ Read timeline feed
  - [x] ✅ Read User Profile Info
  - [x] ✅ Read list of User Threads
    - [x] ✅ With Pagination (If auth provided)
  - [x] ✅ Read list of User Replies
    - [x] ✅ With Pagination (If auth provided)
  - [x] ✅ Fetch PostID(`3140957200974444958`) via ThreadID(`CuW6-7KyXme`) or PostURL(`https://www.threads.net/t/CuW6-7KyXme`)
  - [x] ✅ Read Threads via PostID
  - [x] ✅ Read Likers in Thread via PostID
  - [x] ✅ Read User Followers
  - [x] ✅ Read User Followings
- [x] ✅ Write data (i.e. write automated Threads)
  - [x] ✅ Create new Thread with text
    - [x] ✅ Make link previews to get shown
  - [x] ✅ Create new Thread with a single image
  - [x] ✅ Create new Thread with multiple images
  - [x] ✅ Reply to existing Thread
  - [x] ✅ Quote Thread
  - [x] ✅ Delete Thread
- [x] ✅ Friendships
  - [x] ✅ Follow User
  - [x] ✅ Unfollow User
- [x] ✅ Interactions
  - [x] ✅ Like Thread
  - [x] ✅ Unlike Thread
- [x] 🏴‍☠️ Restructure the project as a monorepo
  - [x] 🏴‍☠ Add Demo App with Next.js
    - [x] Use components in 🏴‍☠️ [junhoyeo/react-threads](https://github.com/junhoyeo/react-threads)
    - [ ] Make it better
    - [ ] Package with [:electron: Electron](https://github.com/electron/electron)
  - [x] 🏴‍☠️ Cool CLI App to run Threads in the Terminal

## [<img src="https://github.com/junhoyeo/threads-api/raw/main/.github/emojis/sewing-needle.png" width="30" height="30" />](https://github.com/junhoyeo) Projects made with `threads-api`

> Add yours by just opening an [pull request](https://github.com/junhoyeo/threads-api/pulls)!

### [🏴‍☠️ `react-threads`: Embed Static Threads in your React/Next.js application.](https://github.com/junhoyeo/react-threads)

[![NPM](https://img.shields.io/npm/v/react-threads.svg?style=flat-square&labelColor=black)](https://www.npmjs.com/package/react-threads) [![MIT License](https://img.shields.io/badge/license-MIT-blue?style=flat-square&labelColor=black)](https://github.com/junhoyeo/react-threads/blob/main/license) [![Prettier Code Formatting](https://img.shields.io/badge/code_style-prettier-brightgreen.svg?style=flat-square&labelColor=black)](https://prettier.io) [![](https://img.shields.io/github/stars/junhoyeo%2Freact-threads?style=social)](https://github.com/junhoyeo/react-threads)

> Embed Static Threads in your React/Next.js application. UI components for Meta's Threads. _Powered by **junhoyeo/threads-api**._

[![cover](https://github.com/junhoyeo/react-threads/raw/main/.github/cover.jpg)](https://react-threads.vercel.app)

#### Demo

> **Warning**<br/>
> Vercel Deployment is currently sometimes unstable. 🏴‍☠️

[![cover](https://github.com/junhoyeo/react-threads/raw/main/.github/cover-netflix.png)](https://react-threads.vercel.app/CuUoEcbRFma)

<details>
  <summary>
  <h3>🏴‍☠️ <code>threads-api</code> CLI (WIP)</code></h3>

To use the `threads-api` command line interface, run the following command:

  </summary>

```sh
$ npx threads-api --help
Usage: threads-api [command] [options]

Options:
  -v, --version                                                                   output the current version
  -h, --help                                                                      display help for command

Commands:
  help                                                                            display help for command
  getUserIDfromUsername|userid|uid|id <username>                                  det user ID from username
  getUserProfile|userprofile|uprof|up <username> <userId> [stringify]             get user profile
  getUserProfileThreads|uthreads|ut <username> <userId> [stringify]               get user profile threads
  getUserProfileReplies|userreplies|ureplies|ur <username> <userId> [stringify]   get user profile replies
  getPostIDfromURL|postid|pid|p <postURL>                                         get post ID from URL
  getThreads|threads|t <postId> [stringify]                                       get threads
  getThreadLikers|threadlikers|likers|l <postId> [stringify]                      get thread likers
```

</details>

### [👤 `threads-card`: Share your Threads profile easily](https://github.com/yssf-io/threads-card)

### [👤 `Strings`: Web-Frontend for Threads](https://github.com/Nainish-Rai/strings-web)

[![Screenshot (84)](https://github.com/Nainish-Rai/threads-api/assets/109546113/e8c4b990-6a95-470d-bbff-55a04f850b7b)](https://strings.vercel.app)

### [👤 `threads-projects`: Unleashing the power of Meta's Threads.net platform with insightful bots and efficient workflows](https://github.com/AayushGithub/threads-projects)

<p align="center">
  <img width = "550px" height="auto" src="https://github.com/AayushGithub/threads-api/assets/66742440/ae09b734-4f2b-48cc-93f6-6eb0375238ec">
</p>

### [🧵 `thread-count`: Custom status badges for Meta's Threads.net follower counts](https://github.com/AayushGithub/thread-count)

<div align="center">

| parameter                       | demo                                                                                                                                                                                                                                  |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Default (_junhoyeo's account)` | <a href="https://www.threads.net/@_junhoyeo"><img src="https://thread-count.vercel.app/thread-count/_junhoyeo" alt="_junhoyeo Badge"></a>                                                                                             |
| `Custom Text and Colors`        | <a href="https://www.threads.net/@fortune_cookie_bot"><img src="https://thread-count.vercel.app/thread-count/fortune_cookie_bot?label=Follower%20Count&labelColor=white&color=pink&gradient=false" alt="Alternative Count Badge"></a> |
| `Scale Badge Size`              | ![https://www.threads.net/@zuck](https://thread-count.vercel.app/thread-count/zuck?scale=1.5)                                                                                                                                         |

</div>

### [🤖 `thread-year-prog-bot`: Bot weaving the fabric of time](https://github.com/SethuSenthil/thread-year-prog-bot)

 <img src="https://raw.githubusercontent.com/SethuSenthil/thread-year-prog-bot/main/assets/full-preview.PNG" height="600">

## License

<p align="center">
  <a href="https://github.com/junhoyeo">
    <img src="https://github.com/junhoyeo/threads-api/raw/main/.github/labtocat.png" width="256" height="256">
  </a>
</p>

<p align="center">
  <strong>MIT © <a href="https://github.com/junhoyeo">Junho Yeo</a></strong>
</p>

If you find this project intriguing, **please consider starring it(⭐)** or following me on [GitHub](https://github.com/junhoyeo) (I wouldn't say [Threads](https://www.threads.net/@_junhoyeo)). I code 24/7 and ship mind-breaking things on a regular basis, so your support definitely won't be in vain.
