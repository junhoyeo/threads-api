export const TIMEOUT = 100_000;

export const rawCredentials =
  !process.env.USERNAME || !process.env.PASSWORD
    ? null
    : { username: process.env.USERNAME, password: process.env.PASSWORD };

export const credentials =
  !process.env.USERNAME || !process.env.TOKEN //
    ? rawCredentials
    : { username: process.env.USERNAME, token: process.env.TOKEN };
