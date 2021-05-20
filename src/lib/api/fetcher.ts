import { HTTP_STATUS, ResponseError, ResponseHeaders } from '../../config/api';


/* Check if response status is 204 or contentLength is 0 */
export const isResponseEmpty = (response: Response): boolean =>
  response?.status === HTTP_STATUS.NO_CONTENT ||
  response?.headers?.get(ResponseHeaders.ContentLength) === '0'
;

/**
 * Default fetch function used for API calls
 * @param url - API url to call
 * @param reqInit - Request config
 * @returns parsed Response or throw an Error
 */
export async function fetcher<T>(url: string | Request, reqInit?: RequestInit): Promise<T> {
  const response = await fetch(url, reqInit);

  if (response.ok) return isResponseEmpty(response) ? {} as T : await response.json();

  const {
    message = `Fetching the resource ${url} failed`,
    status = response.status
  } = await response.json();

  const error: ResponseError = new Error(message);
  error.status = status;
  error.url = response.url;

  throw error;
}

