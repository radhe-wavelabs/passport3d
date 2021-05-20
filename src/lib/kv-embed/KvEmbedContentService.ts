import { RefObject } from 'react';
import API, { ATTENDEE, INFO, PROTECTED } from '../api';
import { KvEmbedResourceService } from './KvEmbedResourceService';
import { KvEmbedTrackingService, TrackingParamsType } from './KvEmbedTrackingService';
import TrackingParamsMapper from './KvEmbedTrackingDataMapper';

export class KvEmbedContentService {
  static initShowcaseEmbedContentService(embedId: string, pagePath = '', embedRef: RefObject<HTMLDivElement>): () => void {
    const sourceInstance = KvEmbedResourceService.initEmbedShowcase(embedId, pagePath);
    new KvEmbedContentService(sourceInstance, embedRef);

    return sourceInstance.unloadSource;
  }
  static initPresentationEmbedContentService(embedId: string, embedRef: RefObject<HTMLDivElement>): () => void {
    const sourceInstance = KvEmbedResourceService.initEmbedPresentation(embedId);
    new KvEmbedContentService(sourceInstance, embedRef);

    return sourceInstance.unloadSource;
  }

  private readonly resource: KvEmbedResourceService

  private subscription = (): Promise<void> => API[PROTECTED].fetchCurrentUserInfo(ATTENDEE, INFO)
    .then(TrackingParamsMapper.mapToParams)
    .then(this.trackKvData)
  ;

  private trackKvData = (data: TrackingParamsType): void => {
    if (this.resource.isSourceLoaded() && this.embedRef.current) {
      KvEmbedTrackingService.trackData(data);
    }
  }

  protected constructor(resource: KvEmbedResourceService, private readonly embedRef: RefObject<HTMLDivElement>) {
    this.resource = resource;
    // register kv-data tracking function
    this.resource.addSubscription(this.subscription);
    // load embed resource after embed-container rendered
    if (this.embedRef.current) this.resource.loadSource();
  }
}
