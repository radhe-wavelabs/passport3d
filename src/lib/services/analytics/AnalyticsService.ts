import api, { PROTECTED, TrackingDataEventType } from '../../api';
import { PageViewEvent } from './PageViewEvent';
import HistoryMiddleware, { OverrideType } from './HistoryMiddleware';
import { Hub, Auth } from 'aws-amplify';
import { HubCallback } from '@aws-amplify/core';
import { isPassportProfile } from '../../../app-config';


export class AnalyticsService {
  static async init(): Promise<void> {
    let isAuthenticated = false;
    try {
      await Auth.currentAuthenticatedUser();
      isAuthenticated = true;
    } catch {
      isAuthenticated = false;
    } finally {
      new AnalyticsService(isAuthenticated);
    }
  }

  private enable = ():void => {
    this._enabled = true;
    this.historyMiddleware.use();
  };
  private disable = ():void => {
    this._enabled = false;
    this.historyMiddleware.discard();
  };

  private historyMiddleware;
  private trackPageViewEvent: OverrideType = (...args) => {
    const [ , , url ] = args;
    const event = new PageViewEvent(url);
    this.sendTrackingData(event);
  }

  private sendTrackingData = (data: TrackingDataEventType): void => {
    api[PROTECTED].sendTrackingData(data);
  }

  private authSubscription = (): void => {
    Hub.listen('auth', (({ payload: { event }}) => {
      switch (event) {
      case 'signIn':
        return this.enable();
      case 'signOut':
        return this.disable();
      }
    }) as HubCallback);
  }

  protected constructor(protected _enabled: boolean = false) {
    this.historyMiddleware = HistoryMiddleware(this.trackPageViewEvent);
    if (this._enabled) this.historyMiddleware.use();
    this.authSubscription();
  }

}


if (isPassportProfile()) {
  AnalyticsService.init();
}
   
