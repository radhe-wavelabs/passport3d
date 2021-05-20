import { getCurrentSessionToken } from '../../../lib/auth';
import { Fetcher, FetcherParams, RequestHeaders } from '../../api';

type HeadersOverrides<T> = (headers?: HeadersInit) => T;

export const setDefaultHeaders: HeadersOverrides<Headers> = (headers = {}) => {
  const requestHeaders = new Headers(headers);

  if (!requestHeaders.has(RequestHeaders.ContentType)) {
    requestHeaders.set(RequestHeaders.ContentType, 'application/json');
  }

  return requestHeaders;
};

export const setAuthHeaders: HeadersOverrides<Promise<Headers>> = async (headers = {}) => {
  const token = await getCurrentSessionToken();
  const requestHeaders = new Headers(headers);

  requestHeaders.set(RequestHeaders.AuthToken, token as string);

  return requestHeaders;
};

export const withDefaultHeaders = <T>(fn: Fetcher) => async (...args: FetcherParams): Promise<T> => {
  const [ url, reqInit = {} ] = args;
  reqInit.headers = setDefaultHeaders(reqInit.headers);

  return fn(url, reqInit);
};

export const withAuthHeaders = <T>(fn: Fetcher) => async (...args: FetcherParams): Promise<T> => {
  const [ url, reqInit = {} ] = args;
  reqInit.headers = await setAuthHeaders(reqInit.headers);

  return fn(url, reqInit);
};
