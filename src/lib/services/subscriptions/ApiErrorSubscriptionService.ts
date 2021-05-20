import { ErrorSubscription, ResponseError } from '../../../config/api';

export interface IApiErrorSubscriptionService {
  subscribe(subscription: ErrorSubscription): void;
  unsubscribe(subscription: ErrorSubscription): void;
  notifySubscribers(e: ResponseError): void;
}


export class ApiErrorSubscriptionService implements IApiErrorSubscriptionService {
  private readonly subscriptions: Set<ErrorSubscription>;
  private static instance: ApiErrorSubscriptionService;

  private constructor() {
    this.subscriptions = new Set();
  }

  public static getInstance(): ApiErrorSubscriptionService {
    if (!ApiErrorSubscriptionService.instance) {
      ApiErrorSubscriptionService.instance = new ApiErrorSubscriptionService();
    }
    return ApiErrorSubscriptionService.instance;
  }

  public subscribe = (subscription: ErrorSubscription): void => {
    this.subscriptions.add(subscription);
  }

  public unsubscribe = (subscription: ErrorSubscription): void => {
    this.subscriptions.delete(subscription);
  }

  public notifySubscribers = (e: ResponseError): void => [ ...this.subscriptions.values() ]
    .forEach(subscription => subscription?.(e))
  ;
}

export default ApiErrorSubscriptionService.getInstance() as ApiErrorSubscriptionService;
