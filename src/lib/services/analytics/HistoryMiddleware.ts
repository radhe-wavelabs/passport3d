export type OverrideType = (state?: unknown, title?: unknown, url?: string) => void;
export type OverrideSrcMethod = 'pushState' | 'replaceState';
export type HistoryOverrides = Record<OverrideSrcMethod, OverrideType>;



export class HistoryMiddleware {
  static readonly methodsToOverride: OverrideSrcMethod[] = ['pushState', 'replaceState'];
  static readonly subscriptionEvents: string[] = ['popstate'];

  static init(methodOverride: OverrideType): HistoryMiddleware {
    if (typeof methodOverride === 'function') {
      return new HistoryMiddleware(methodOverride);
    }
    throw new Error('HistoryMiddleware initializing failed');
  }

  protected src: HistoryOverrides;

  readonly ctx: History;
  readonly methodOverride: OverrideType;
  readonly useMethodOverride:(next: OverrideType) => OverrideType;

  protected constructor(methodOverride: OverrideType, private readonly _global = window) {
    this.ctx = Reflect.get(_global, 'history');

    this.src = HistoryMiddleware.methodsToOverride
      .reduce((_src, _method) => {
        _src[_method] = Reflect.get(this.ctx, _method).bind(this.ctx);
        return _src;
      }, Object.create(null));

    this.methodOverride = methodOverride;

    this.useMethodOverride = (next: OverrideType) => (...args: unknown[]) => {
      methodOverride(...args);
      return next(...args);
    };
  }

  private applyOverride(method: OverrideSrcMethod) {
    this.ctx[method] = this.useMethodOverride(this.src[method]);
  }
  private removeOverride(method: OverrideSrcMethod) {
    this.ctx[method] = this.src[method];
  }

  private subscribeToEvent(event: string) {
    this._global.addEventListener(event, this.methodOverride);
  }
  private unsubscribeFromEvent(event: string) {
    this._global.removeEventListener(event, this.methodOverride);
  }

  public use(): void {
    HistoryMiddleware.methodsToOverride.forEach(this.applyOverride, this);
    HistoryMiddleware.subscriptionEvents.forEach(this.subscribeToEvent, this);
    this.methodOverride();
  }
  public discard(): void {
    HistoryMiddleware.methodsToOverride.forEach(this.removeOverride, this);
    HistoryMiddleware.subscriptionEvents.forEach(this.unsubscribeFromEvent, this);
  }

}

export default HistoryMiddleware.init;
