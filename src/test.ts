import { ThreadsAPI } from '.';

const main = async () => {
  const threadsAPI = new ThreadsAPI();

  const id = await threadsAPI.getUserIDfromUsername('_junhoyeo');
  console.log(id);

  const user = await threadsAPI.getUserProfile('_junhoyeo', id!);
  console.log(JSON.stringify(user));
};
main();
