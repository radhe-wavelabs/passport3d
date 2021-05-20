import { getKvEmbedPresentationUrl, getKvEmbedShowcasePageUrl, getKvEmbedShowcaseUrl } from '../api/utils';
import { KvEmbedType } from './index';

export enum EmbedLoadType { DEFER = 'defer', ASYNC = 'async' }
export type SubscriptionType = () => void;


/**
 * KV Embed Resources API
 */
export class KvEmbedResourceService {
  static readonly LOAD_COMPLETE = 'load';
  private static createResource(src: string, attr: EmbedLoadType = EmbedLoadType.DEFER): HTMLScriptElement {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    script.setAttribute(attr, 'true');

    return script;
  }

  public static initEmbedShowcase(embedId: string, pagePath?: string): KvEmbedResourceService {
    const url = pagePath ? getKvEmbedShowcasePageUrl(embedId, pagePath) : getKvEmbedShowcaseUrl(embedId);
    const resource = this.createResource(url);

    return new KvEmbedResourceService(resource, embedId, KvEmbedType.SHOWCASE);
  }

  public static initEmbedPresentation(embedId: string): KvEmbedResourceService {
    const url = getKvEmbedPresentationUrl(embedId);
    const resource = this.createResource(url);

    return new KvEmbedResourceService(resource, embedId, KvEmbedType.PRESENTATION);
  }

  private isLoaded = false;
  private readonly _subscriptions: Set<SubscriptionType> = new Set();

  private load = (): void => {
    if (this._resource) {
      this._resource.addEventListener(KvEmbedResourceService.LOAD_COMPLETE, this.updateResourceStatus);
      document.body.appendChild(this._resource);
    }
  }
  private unload = (): void => {
    if (this._resource) {
      this._resource.removeEventListener(KvEmbedResourceService.LOAD_COMPLETE, this.updateResourceStatus);
      document.body.removeChild(this._resource);
    }
    this.isLoaded = false;
    this.resetSubscriptions();
  }

  private updateResourceStatus = (): void => {
    this.isLoaded = true;
    this.notifySubscribers();
  }

  private notifySubscribers = (): void => {
    if (this._subscriptions.size) [...this._subscriptions.values()].forEach(Reflect.apply);
  };
  private resetSubscriptions = (): void => this._subscriptions.clear();

  protected constructor(
    private readonly _resource: HTMLScriptElement,
    private readonly id: string,
    private readonly type: KvEmbedType
  ) {}

  public isSourceLoaded = (): boolean => this.isLoaded;

  public addSubscription = (subscription: SubscriptionType): void => {
    this._subscriptions.add(subscription);
  }

  public loadSource = (): void => { this.load(); }
  public unloadSource = (): void => { this.unload(); }
}
