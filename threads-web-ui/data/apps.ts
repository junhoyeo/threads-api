type AppAuthor = {
  name: string;
  threads_username?: string; // WIP
  github_username?: string;
};
export type AppRegistry = {
  name: string;

  // Add a new tag here if you want!
  tags?: ('api' | 'bot' | 'client' | 'app' | 'ui')[];

  threads_username?: string;
  repository?: string;
  url?: string;
  description: string;
  avatar?: string;
} & (
  | {
      author: AppAuthor;
    }
  | {
      authors: AppAuthor[];
    }
);

export const APPS: AppRegistry[] = [
  {
    name: 'Threads Web',
    tags: ['app'],
    threads_username: 'swarajbachu',
    url: 'https://threads.aperturs.com',
    repository: 'https://github.com/swarajbachu/threads-web',
    description:
      'Post on threads from web now, will be adding more features soon. Your password is safe if your browser and we only login to your accounts once! so it wont get banned',
    avatar: '/assets/apps/aperturs.jpg',
    author: {
      name: 'Swaraj Bachu',
      github_username: 'swarajbachu',
    },
  },
  {
    name: 'Threads Card',
    tags: ['app'],
    repository: 'https://github.com/yssf-io/threads-card',
    description: 'Simple read-only profile page for Threads',
    author: {
      name: 'yssf',
      github_username: 'yssf-io',
    },
  },
  {
    name: 'String',
    tags: ['client'],
    repository: 'https://github.com/Nainish-Rai/strings-web',
    description:
      'String is a modern and innovative threads opensource frontend built with Next.js, Tailwind CSS, and the latest web development technologies.',
    author: {
      name: 'Nainish Rai',
      github_username: 'Nainish-Rai',
    },
  },
  {
    name: 'Fortune Cookie Bot',
    tags: ['bot'],
    threads_username: 'fortune_cookie_bot',
    repository: 'https://github.com/AayushGithub/threads-projects#fortune-cookie-bot',
    description:
      'Provides valuable insights and a daily dose of wisdom. This bot leverages the Advice Slip API to fetch interesting advice and pairs it with a random image from various sources.',
    avatar: '/assets/apps/fortune_cookie_bot.jpg',
    author: {
      name: 'Aayush Gandhi',
      github_username: 'AayushGithub',
    },
  },
  {
    name: 'OPT Timeline Bot',
    tags: ['bot'],
    threads_username: 'opttimeline',
    repository: 'https://github.com/AayushGithub/threads-projects#opt-timeline-bot',
    description: 'Tracks F1 OPT cases statuses and posts updates!',
    avatar: '/assets/apps/opttimeline.jpg',
    author: {
      name: 'Aayush Gandhi',
      github_username: 'AayushGithub',
    },
  },
  {
    name: 'Threads Discord Bot',
    tags: ['app', 'client'],
	url: 'https://threadsbot.us/',
    description: 'Bringing the latest Threads.net posts directly to your Discord server. Stay connected with the Threads by Instagram Discord Bot!',
    avatar: '/assets/apps/threadsdiscord.png',
    author: {
      name: 'Digital',
      github_username: 'Digital39999',
    },
  },
  {
    name: 'Thread Count',
    tags: ['api'],
    repository: 'https://github.com/AayushGithub/thread-count',
    description:
      'Thread Count is a service that allows you to generate custom status badges displaying Threads follower counts.',
    author: {
      name: 'Aayush Gandhi',
      github_username: 'AayushGithub',
    },
  },
  {
    name: 'Year Progress',
    tags: ['bot'],
    threads_username: 'yearprog',
    repository: 'https://github.com/SethuSenthil/thread-year-prog-bot',
    description: '🤖 Year Progress Bar \n🪡 Weaving the fabric of ⏳ time, thread by thread 🧵',
    avatar: '/assets/apps/yearprog.jpg',
    author: {
      name: 'Sethu Senthil',
      github_username: 'SethuSenthil',
    },
  },
  {
    name: 'Splatoon3.ink',
    tags: ['bot'],
    threads_username: 'splatoon3ink',
    repository: 'https://github.com/misenhower/splatoon3.ink',
    description:
      '🦑🐙 Splatoon 3 map rotations, Salmon Run schedules, and more. Not affiliated with Nintendo.',
    avatar: '/assets/apps/splatoon3-ink.png',
    authors: [
      {
        name: 'Matt Isenhower',
        github_username: 'misenhower',
      },
      {
        name: 'Jack',
        github_username: 'FieryFlames',
      },
    ],
  },
  {
    name: 'Hacker News Bot',
    tags: ['bot'],
    threads_username: 'hackernewsbot',
    description: 'Top 5 HackerNews Stories, every hour. Not affiliated with HN or YC 🤖',
    avatar: '/assets/apps/hackernewsbot.jpg',
    author: {
      name: 'yssf',
      github_username: 'yssf-io',
    },
  },
  {
    name: '🤖쓰웨더봇 (Threads + Weather)',
    tags: ['bot'],
    threads_username: 'b__polarbear',
    description:
      'Threads API, GPT-4 기반 날씨알림 서비스! \n매일 아침 7시에 날씨 브리핑을 올려드려요! ⛅️ Made By 이민규⭐️',
    avatar: '/assets/apps/b__polarbear.jpg',
    author: {
      name: '이민규',
      threads_username: 'mingyu_9495',
    },
  },
  {
    name: 'Year Progress',
    tags: ['bot'],
    threads_username: 'progressyearly',
    description: 'The clock is always ticking. ⏰',
    avatar: '/assets/apps/progressyearly.jpg',
    author: {
      name: 'Siddhanth Kumar',
    },
  },
  {
    name: 'Year Progress Bar',
    tags: ['bot'],
    threads_username: 'yearsprogress',
    description: "The only progress bar you'd rather see go slower.",
    avatar: '/assets/apps/yearsprogress.jpg',
    author: {
      name: 'Max Mykhalchuk',
      threads_username: 's1mpsondev',
    },
  },
  {
    name: 'One Day One Ayah',
    tags: ['bot'],
    threads_username: 'oneayah.id',
    repository: 'https://github.com/fitrahive/oneayah-threads',
    description: 'Sharing an ayah from the Quran every day (in Bahasa).',
    author: {
      name: 'Abu Masyail',
      threads_username: 'sooluh',
    },
  },
  {
    name: 'Insta Threads Down',
    tags: ['app', 'ui'],
    threads_username: 'rajatdas.me',
    url: 'http://instathreadsdown.com/',
    repository: 'https://github.com/iRajatDas/Insta-Threads-Down',
    description:
      '🚀 A Threads Media Downloader is a tool to download Photos, Videos & DP from Threads.',
    avatar: '/assets/apps/instathreadsdown.jpg',
    author: {
      name: 'Rajat Das',
      github_username: 'irajatdas',
    },
  },
  {
    name: 'Threads Media Downloader',
    tags: ['app'],
    threads_username: 'frz.ra',
    url: 'https://mediathreads.net',
    repository: 'https://github.com/farizrifqi/Threads-Media-Downloader',
    description:
      'Threads multiple photo and video downloader.',
    avatar: '/assets/apps/mediathreadsnet.jpg',
    author: {
      name: 'Fariz Rifqi',
      github_username: 'farizrifqi',
    },
  },
  {
    name: 'ReThreads',
    tags: ['app'],
    threads_username: 'newttt0n',
    url: 'https://rethreads.pro',
    description:
      'Turn Meta Threads and replies into beautiful image post with AI.',
    avatar: '/assets/apps/rethreads.png',
    author: {
      name: 'Newton',
      github_username: 'Newt0n',
    },
  },
{
    name: 'Yout Gpt',
    tags: ['bot'],
    threads_username: 'youtgpt',
    repository: 'https://github.com/steveyout/threads-gpt',
    description: 'A threads.net bot to automatically reply to mentions with sarcastic replies from chatgpt',
    author: {
      name: 'Steve Yout',
      threads_username: 'steveyout',
    },
  },
{
    name: 'Threstagram',
    tags: ['app', 'ui'],
    threads_username: 'dunsincodes',
    repository: 'https://github.com/Dun-sin/threstagram',
    description: 'Convert your threads posts to images for instagram and other social medias',
    author: {
      name: 'Dunsin',
      github_username: 'Dun-sin',
    },
  },
];
