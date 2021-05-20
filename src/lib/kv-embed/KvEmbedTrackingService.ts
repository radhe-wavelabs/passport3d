export const KV_LOADER = 'knowledgevisionLoader';

export enum KV_PARAMS {
  KV_ID = 'kvID',
  KV_NAME = 'kvName',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  TITLE = 'title',
  EXTERNAL_ATTENDEE_ID = 'externalAttendeeId',
  EXTERNAL_ORGANIZATION_ID = 'externalOrganizationId',
  ORGANIZATION_NAME = 'organizationName'
}

export type TrackingParamsType = Record<KV_PARAMS, string | number | null>;
export type KVLoaderType = { loaded: boolean, trackParameters(params: TrackingParamsType): void }

/**
 * Wrapper on knowledgevisionLoader
 */
export class KvEmbedTrackingService {
  private static readonly serviceName: string = KV_LOADER;

  private static getInstance = (): KVLoaderType => {
    if (!Reflect.has(window, KvEmbedTrackingService.serviceName)) {
      throw new Error(`Service ${KvEmbedTrackingService.serviceName} is not available`);
    }

    return Reflect.get(window, KvEmbedTrackingService.serviceName);
  }

  private static isReady = (): boolean => KvEmbedTrackingService.getInstance().loaded;

  public static trackData = (trackingParams: TrackingParamsType): void => {
    if (KvEmbedTrackingService.isReady()) {
      const _instance = KvEmbedTrackingService.getInstance();
      if (Reflect.has(_instance, 'trackParameters')) _instance.trackParameters(trackingParams);
    }
  }
}
