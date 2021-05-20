import useSWR, { ConfigInterface, keyInterface, responseInterface } from 'swr';
import { fetcher } from '../../../lib/api/fetcher';
//eslint-disable-next-line @typescript-eslint/no-explicit-any
type Data = any; type Error = any;

type Fn<T> = (...args: T[]) => T | Promise<T>;

export const _defaults = {
  revalidateOnFocus: false,
  shouldRetryOnError: false,
};


export const useSWRWithDefaults = (
  key: keyInterface,
  fn: Fn<Data> = fetcher,
  config: ConfigInterface = {}
): responseInterface<Data, Error> => useSWR(key, fn, { ..._defaults, ...config });
