export const TIMEOUT = 100_000;

export const credentials =
  !process.env.USERNAME || !process.env.PASSWORD
    ? null
    : {
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
      };
