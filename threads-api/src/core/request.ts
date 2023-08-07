import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import type { PrivateClient } from '../clients/private';
import type { Client } from '../clients/visitor';

export abstract class Request<Data = any, Error extends Request.Error = any> {
  abstract url: string;
  baseURL = 'https://i.instagram.com';
  searchParams?: Record<string, any> | undefined;
  headers?: Record<string, string> | undefined;
  responseType?: ResponseType | undefined;

  isPrivate(): this is PrivateQuery {
    return false;
  }

  isGraphql(): this is GraphqlQuery {
    return false;
  }

  isMutation(): this is Mutation {
    return false;
  }

  send(client: Client) {
    return this.fetch(client);
  }

  async fetch<T = Data>(client: Client, options?: Request.FetchOptions): Promise<Response<T, Error>> {
    let { url, searchParams, responseType } = this;

    if (url[0] === '/') {
      url = this.baseURL + url;
    }
    if (searchParams) {
      const filteredParams = new URLSearchParams(
        Object.entries(searchParams).filter((entry) => entry[1] !== undefined),
      );
      url += '?' + filteredParams.toString();
    }

    // @ts-ignore
    const headers = client.headers(this);
    const init: AxiosRequestConfig = {
      ...options,
      headers,
      responseType,
      validateStatus: null,
    };

    let response: AxiosResponse<T>;
    try {
      response = await axios(url, init);
      setResponseInspectTag(response);
    } catch (e: any) {
      const error = e as RequestError;
      error.code = 'request';
      error.request = { ...init, url };

      return toErrorResponse(error);
    }

    try {
      if (Math.floor(response.status / 100) !== 2) {
        const error: ResponseError = new Error('Response not ok') as any;
        error.code = 'response';
        error.request = { ...init, url };
        error.response = response;
        error.data = response.data;

        return toErrorResponse(error);
      }

      let data: any = response;
      if (responseType) {
        data = response.data;

        // TODO: might be able to move this into PrivateQuery?
        if (!this.isGraphql() && responseType === 'json' && data.status === 'fail') {
          const error = new Error(data.message) as ResponseError;
          error.code = 'response';
          error.request = { ...init, url };
          error.response = response;
          error.data = data;

          return toErrorResponse(error);
        }
      }

      return toSuccessResponse(data);
    } catch (e: any) {
      const error = e as ResponseError;
      error.code = 'response';
      error.request = { ...init, url };
      error.response = response;

      return toErrorResponse(error);
    }
  }
}

export declare namespace Request {
  type FetchOptions = Omit<AxiosRequestConfig, 'headers' | 'responseType'>;
  type Error = {
    code: string;
    message: string;
  };
}

export interface PaginationOptions {
  maxID?: string;
  firstRecordTimestamp?: number;
}

export abstract class Query<Data = any, Error extends Request.Error = any> //
  extends Request<Data, Error>
{
  declare isPrivate: () => false;
}

export abstract class GraphqlQuery<Data = any, Error extends Request.Error = any> //
  extends Query<Data, Error>
{
  readonly url = 'https://www.threads.net/api/graphql';
  readonly responseType = 'json';

  abstract documentId: string;
  abstract variables: Record<string, any>;
  /**
   * Often times, the data is the sole property in a wrapper object. Define its
   * key with the `responseKey` property to unwrap it automatically.
   */
  declare responseKey?: string | string[];

  isGraphql(): this is GraphqlQuery {
    return true;
  }

  async send(client: Client) {
    this.headers = {
      Accept: '*/*',
      'Accept-Language': client.options.locale,
      'cache-control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Origin: 'https://www.threads.net',
      Pragma: 'no-cache',
      'Sec-Fetch-Site': 'same-origin',
      'X-Asbd-id': '129477',
      'X-FB-Friendly-Name': 'BarcelonaProfileRootQuery',
      'X-FB-Lsd': client.options.fbLSDToken,
      'X-Ig-App-Id': '238260118697367',
      ...this.headers,
    };

    // GraphQL responses always have a data wrapper.
    type GraphqlResponse = {
      data: Data;
    };

    const response = await this.fetch<GraphqlResponse>(client, {
      method: 'POST',
      data: new URLSearchParams({
        lsd: client.options.fbLSDToken,
        variables: JSON.stringify(this.variables),
        doc_id: this.documentId,
      }),
    });

    if (response.success) {
      let data: any = response[0].data;

      const { responseKey } = this;
      if (responseKey != null) {
        if (Array.isArray(responseKey)) {
          if (!deepHas(data, responseKey)) {
            throw Error(`Response key "${responseKey.join('.')}" not found`);
          }
          data = deepGet(data, responseKey);
        } else {
          if (!(responseKey in data)) {
            throw Error(`Response key "${responseKey}" not found`);
          }
          data = data[responseKey];
        }
      }

      response[0] = data;
    }

    return response as Response<Data, Error>;
  }
}

function deepHas(obj: any, path: string[]) {
  for (const key of path) {
    if (!(key in obj)) {
      return false;
    }
    obj = obj[key];
  }
  return true;
}

function deepGet(obj: any, path: string[]) {
  for (const key of path) {
    if (obj == null) {
      return obj;
    }
    obj = obj[key];
  }
  return obj;
}

export abstract class PrivateQuery<Data = any, Error extends Request.Error = any> //
  extends Request<Data, Error | PrivateQuery.Error>
{
  isPrivate(): this is PrivateQuery {
    return true as const;
  }

  async fetch<T = Data>(
    client: PrivateClient,
    options?: Request.FetchOptions,
  ): Promise<Response<T, Error | PrivateQuery.Error>>;

  async fetch<T = Data>(client: PrivateClient, options?: Request.FetchOptions): Promise<Response<T, any>> {
    const response = await super.fetch<T>(client, options);
    if (response.success) {
      return response;
    }
    const { error } = response;
    if (isResponseError(error) && error.data?.message === 'login_required') {
      return toErrorResponse<TokenError>({
        code: 'token',
        message: 'User token was rejected',
        request: error.request,
        response: error.response,
      });
    }
    return response;
  }
}

export declare namespace PrivateQuery {
  type Error = TokenError | RequestError | ResponseError;
}

export abstract class Mutation<Data = any, Error extends Request.Error = any> //
  extends PrivateQuery<Data, Error>
{
  method = 'POST';
  bodyType?: Mutation.BodyType;
  body?: any;

  isMutation(): this is Mutation {
    return true;
  }

  send(
    client: PrivateClient,
    options?: Mutation.SendOptions,
  ): Promise<Response<Data, Error | PrivateQuery.Error>>;

  send(client: PrivateClient, options?: Mutation.SendOptions): Promise<Response<Data, any>> {
    let mimeType: string | undefined;

    let { body, bodyType } = this;
    if (body && typeof body !== 'string' && !Buffer.isBuffer(body)) {
      if (bodyType === 'json') {
        body = JSON.stringify(body);
        mimeType = 'application/json';
      } else if (bodyType !== 'buffer') {
        if (bodyType === 'signed-json') {
          body = JSON.stringify(body);
          body = {
            signed_body: `SIGNATURE.${body}`,
          };
        }
        body = new URLSearchParams(body);
        mimeType = 'application/x-www-form-urlencoded; charset=UTF-8';
      }
    }

    this.headers = {
      ...this.headers,
      'Content-Type': mimeType || 'application/octet-stream',
    };

    return this.fetch(client, {
      ...options,
      method: this.method,
      data: body,
    });
  }
}

export declare namespace Mutation {
  type BodyType = 'json' | 'signed-json' | 'form' | 'buffer';
  type SendOptions = Omit<Request.FetchOptions, 'method' | 'data'>;
}

export type Response<Data = any, Error = any> =
  | SuccessResponse<Data>
  | ErrorResponse<Error | RequestError | ResponseError>;

export type SuccessResponse<Data = any> = [data: Data, error: undefined] & {
  success: true;
  data: Data;
  error?: undefined;
};

export type ErrorResponse<Error = any> = [data: undefined, error: Error] & {
  success: false;
  error: Error;
  data?: undefined;
};

export function toSuccessResponse<Data>(data: Data): SuccessResponse<Data> {
  return new ResponseTuple(data) as any;
}

export function toErrorResponse<Error>(error: Error): ErrorResponse<Error> {
  return new ResponseTuple(undefined, error) as any;
}

class ResponseTuple extends Array {
  constructor(data: any, error?: any) {
    super(2);
    this[0] = data;
    this[1] = error;
  }
  get success() {
    return this[1] === undefined;
  }
  get data() {
    return this[0];
  }
  get error() {
    return this[1];
  }
}

export type RequestError = Error & {
  code: 'request';
  request: AxiosRequestConfig & { url: string };
};

export type ResponseError = Error & {
  code: 'response';
  request: AxiosRequestConfig & { url: string };
  response: AxiosResponse;
  /** JSON data included in the response */
  data: any;
};

export type TokenError = {
  code: 'token';
  message: string;
  request: AxiosRequestConfig & { url: string };
  response: AxiosResponse;
};

function isResponseError(error: any): error is ResponseError {
  return error.code === 'response';
}

function setResponseInspectTag(response: AxiosResponse) {
  Object.defineProperty(response, Symbol.for('nodejs.util.inspect.custom'), {
    value: () => `[AxiosResponse ${response.status} ${response.statusText}]`,
  });
}
