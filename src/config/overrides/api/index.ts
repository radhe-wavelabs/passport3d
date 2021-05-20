import { ApiClientProxy, Fetcher } from '../../api';
import { withRetryableConfig } from './fetcher.overrides';
import { withDefaultHeaders, withAuthHeaders } from './headers.overrides';
import apiMethodsOverrides from './methods.overrides';
import { fetcher } from '../../../lib/api/fetcher';

/* Compose fetcher for private API */
const protectedApiFetcher: Fetcher = [ withDefaultHeaders, withAuthHeaders, withRetryableConfig ]
  .reduce((fn, decorate) => decorate(fn), fetcher)
;

/* Compose fetcher for public API */
const publicApiFetcher: Fetcher = [ withDefaultHeaders, withRetryableConfig ]
  .reduce((fn, decorate) => decorate(fn), fetcher)
;

export const protectedApiClientProxy = (new Proxy(protectedApiFetcher, apiMethodsOverrides)) as ApiClientProxy<Fetcher>;
export const publicApiClientProxy = (new Proxy(publicApiFetcher, apiMethodsOverrides)) as ApiClientProxy<Fetcher>;

export {
  protectedApiClientProxy as protectedApiClient,
  publicApiClientProxy as publicApiClient
};
