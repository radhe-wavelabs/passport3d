import { ApiErrorSubscriptionService } from '../ApiErrorSubscriptionService';
import { ApiErrorSubscription } from '../index';

const mockFn = jest.fn();
const error = new Error('msg');

describe('ApiErrorSubscriptionService', () => {
  beforeEach(() => {
    mockFn.mockRestore();
  });
  it('should be the single instance per service', () => {
    expect(ApiErrorSubscriptionService.getInstance()).toEqual(ApiErrorSubscriptionService.getInstance());
  });

  it('should store provided subscription method to be called', () => {
    expect(ApiErrorSubscription.subscribe(mockFn));
  });
  it('should be able to notify subscribers', () => {
    ApiErrorSubscription.notifySubscribers(error);
    expect(mockFn).toHaveBeenCalledWith(error);
  });
  it('should be able to unsubscribe', () => {

    ApiErrorSubscription.unsubscribe(mockFn);
    ApiErrorSubscription.notifySubscribers(error);
    expect(mockFn).not.toHaveBeenCalledWith(error);
  });
});
