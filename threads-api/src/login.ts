import { PrivateClient } from './clients/private';
import { Client } from './clients/visitor';
import { LoginQuery } from './queries/login';

export interface LoginOptions extends Client.Options {
  username: string;
  password: string;
}

export async function login({ username, password, ...options }: LoginOptions): Promise<PrivateClient> {
  const client = new Client(options);
  const [data, error] = await client.send(LoginQuery, username, password);
  if (error) {
    error.message = 'Login failed: ' + error.message;
    throw error;
  }
  return new PrivateClient({
    ...options,
    ...data,
  });
}
