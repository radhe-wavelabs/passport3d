import api, { EventAction, EventType, MetadataType, PROTECTED, TrackingDataEventType } from '../api';
import { getDateTimeIsoOmitMs } from '../helpers/dateHelper';


export function sendTrackingData(event: TrackingDataEventType): Promise<void> {
  try {
    return api[PROTECTED].sendTrackingData(event);
  } catch (e) {
    throw e;
  }
}

export type TrackUserActionType = (value: string, metadata?: MetadataType, label?: string) => Promise<void>;

export const trackUserAction: TrackUserActionType = (value: string, metadata = {}, label = '') => {
  const event = {
    type: EventType.USER_ACTION,
    action: EventAction.CLICK,
    generatedDateTime: getDateTimeIsoOmitMs(),
    value,
    label,
    metadata
  };

  return sendTrackingData(event);
};

const storageKey = 'USER_ACTION::';

export type StoreUserActionType = (value: string, metadata: MetadataType, label?: string) => void;

export const storeUserAction: StoreUserActionType = (value: string, metadata: MetadataType, label = ''): void => {
  window.sessionStorage.setItem(`${storageKey}${value}`, JSON.stringify({ value, metadata, label }));
};

export const getSoredUserActions = (): ({value: string, metadata: MetadataType, label: string})[] => {
  const { sessionStorage: _storage } = window;

  return Object.keys(_storage)
    .filter(key => key.startsWith(storageKey))
    .map((key: string) => {
      const _action = _storage.getItem(key);
      _storage.removeItem(key);

      return JSON.parse(_action as string);
    })
    .filter(Boolean)
  ;

};
