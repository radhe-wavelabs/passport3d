import { ResponseError, RETRY_DELAYS } from '../../../api';
import { withRetryableConfig } from '../fetcher.overrides';
import { ApiErrorSubscription } from '../../../../lib/services/subscriptions';


const e400: ResponseError = new Error(); e400.status = 400;

jest.mock('../../../../lib/services/subscriptions');

describe('Fetcher with retry configuration', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });



  it('should retry to send failed requests with 500ms, 1000ms, 2000ms  delay', async () => {
    jest.spyOn(global, 'setTimeout');
    const e500: ResponseError = new Error(); e500.status = 500;
    const mockFetch = jest.fn(() => {throw e500;});
    await withRetryableConfig(mockFetch)('url');

    RETRY_DELAYS.forEach((delay, i) => {
      expect(mockFetch).toHaveBeenCalledWith('url');
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expect(mockFetch).toBeCalledTimes(i + 1);
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), delay);
      jest.runOnlyPendingTimers();
    });

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(ApiErrorSubscription.notifySubscribers).toBeCalledTimes(1);
    expect(ApiErrorSubscription.notifySubscribers).toBeCalledWith(e500);
  });
  it('should not retry for non-server errors', async () => {
    jest.spyOn(global, 'setTimeout');
    const mockFetch = jest.fn(() => {throw new Error();});
    try {
      await withRetryableConfig(mockFetch)('url2');
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expect(mockFetch).toBeCalledTimes(1);
      expect(ApiErrorSubscription.notifySubscribers).not.toHaveBeenCalled();
    }

  });
});
