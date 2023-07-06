import { ThreadsAPI } from '.';

const main = async () => {
  const threadsAPI = new ThreadsAPI();

  const username = '_junhoyeo';
  const id = await threadsAPI.getUserIDfromUsername(username);
  console.log(id);

  if (!id) {
    return;
  }

  const user = await threadsAPI.getUserProfile(username, id);
  console.log(JSON.stringify(user));

  const posts = await threadsAPI.getUserProfileThreads(username, id);
  console.log(JSON.stringify(posts));
};
main();
