import {
  Fetcher, FetcherParams, ResponseError,
  RETRY_DELAYS, RETRYABLE_STATUSES
} from '../../api';

import { IApiErrorSubscriptionService } from '../../../lib/services/subscriptions/ApiErrorSubscriptionService';
import { ApiErrorSubscription } from '../../../lib/services/subscriptions';

export const isRetryable = (e: ResponseError): boolean => RETRYABLE_STATUSES.includes(e.status as number);

/* Recursively retries specific failed API calls with configurable delays */
export const withRetryableConfig = <T>(fn: Fetcher, attempts = RETRY_DELAYS, subscriptions: IApiErrorSubscriptionService = ApiErrorSubscription) =>
  async (...args: FetcherParams): Promise<T> => {
    let result;

    try {
      result = await fn(...args);
    } catch (e) {
      if (isRetryable(e) && attempts.length) {
        const [ delay, ...rest ] = attempts;

        setTimeout(async () => {
          result = await withRetryableConfig(fn, rest)(...args);
        }, delay);
      } else if (isRetryable(e)) {
        subscriptions.notifySubscribers(e);
      } else {
        throw e;
      }
    }

    return result as Promise<T>;
  };
