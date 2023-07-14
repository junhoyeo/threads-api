export const TIMEOUT = 100_000;

export const credentials = !process.env.TOKEN
  ? !process.env.USERNAME || !process.env.PASSWORD
    ? null
    : {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      }
  : {
      token: process.env.TOKEN,
    };
