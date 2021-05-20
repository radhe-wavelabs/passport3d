export enum HTTP_STATUS {
  // SUCCESS
  OK = 200, NO_CONTENT = 204,
  // CLIENT ERROR
  BAD_REQUEST = 400, UNAUTHORIZED = 401, FORBIDDEN = 403, NOT_FOUND = 404, CONFLICT = 409,
  // SERVER ERROR
  INTERNAL_SERVER_ERROR = 500, BAD_GATEWAY = 502, SERVICE_UNAVAILABLE = 503, GATEWAY_TIMEOUT = 504
}

export enum ResponseHeaders { ContentLength = 'Content-Length' }
export enum RequestHeaders { ContentType = 'Content-Type', Passcode = 'X-API-Passcode', AuthToken = 'X-API-Authentication' }
export enum RequestMethod { Get = 'GET', Post = 'POST', Delete = 'DELETE', Put = 'PUT', Patch = 'PATCH' }

export type ResponseResultType<T> = Promise<T>;
export type ResponseError = Error & { status?: number, message?: string, url?: string };


export type ErrorSubscription = (e: ResponseError) => void;

export type Payload = Record<string, unknown> | null;
export type FetcherParamsWithPayload = [url: string | Request, payload?: Payload, reqInit?: RequestInit];
export type FetcherParams = [url: string | Request, reqInit?: RequestInit];

export type Fetcher = <T>(...params: FetcherParams) => Promise<T>;
export type ApiClientProxy<F> = F
  & Record<RequestMethod.Get | RequestMethod.Delete, F>
  & Record<RequestMethod.Post | RequestMethod.Patch | RequestMethod.Put, <T>(...params: FetcherParamsWithPayload) => Promise<T>>
;

export const RETRYABLE_STATUSES = [
  HTTP_STATUS.INTERNAL_SERVER_ERROR,
  HTTP_STATUS.BAD_GATEWAY,
  HTTP_STATUS.SERVICE_UNAVAILABLE,
  HTTP_STATUS.GATEWAY_TIMEOUT
];

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const RETRY_DELAYS = [ 500, 1000, 2000 ];
