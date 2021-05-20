import { CurrentUserResponseType } from '../api';
import { KV_PARAMS, TrackingParamsType } from './KvEmbedTrackingService';

type TrackingValueType = string;
export default class TrackingParamsMapper {
  static readonly DEFAULT_VALUE: string = '';
  static readonly KEY_LIST: Array<KV_PARAMS> = [
    KV_PARAMS.KV_ID,
    KV_PARAMS.KV_NAME,
    KV_PARAMS.TITLE,
    KV_PARAMS.FIRST_NAME,
    KV_PARAMS.LAST_NAME,
    KV_PARAMS.EXTERNAL_ATTENDEE_ID,
    KV_PARAMS.ORGANIZATION_NAME,
    KV_PARAMS.EXTERNAL_ORGANIZATION_ID
  ];

  static getValueByKey = (key: KV_PARAMS, data: CurrentUserResponseType): TrackingValueType => {
    switch (key) {
    case KV_PARAMS.KV_ID:
      return data?.email ?? TrackingParamsMapper.DEFAULT_VALUE;
    case KV_PARAMS.KV_NAME:
      return [
          data?.firstName ?? TrackingParamsMapper.DEFAULT_VALUE,
          data?.lastName ?? TrackingParamsMapper.DEFAULT_VALUE
      ].join(' ');

    case KV_PARAMS.TITLE:
    case KV_PARAMS.FIRST_NAME:
    case KV_PARAMS.LAST_NAME:
    case KV_PARAMS.EXTERNAL_ATTENDEE_ID:
    case KV_PARAMS.ORGANIZATION_NAME:
    case KV_PARAMS.EXTERNAL_ORGANIZATION_ID:
      return data?.[key]?.toString?.() ?? TrackingParamsMapper.DEFAULT_VALUE;
    default:
      return TrackingParamsMapper.DEFAULT_VALUE;
    }
  }

  static mapToParams = (data: CurrentUserResponseType): TrackingParamsType => {
    return TrackingParamsMapper.KEY_LIST
      .reduce((params, key) => {
        params[key] = TrackingParamsMapper.getValueByKey(key, data);
        return params;
      }, {} as TrackingParamsType);
  }
}
