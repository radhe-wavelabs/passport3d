import { Fetcher, FetcherParams, FetcherParamsWithPayload, Payload, RequestMethod } from '../../api';


export const setRequestMethod = (req: RequestInit, method: RequestMethod): void => {
  Reflect.set(req, 'method', method);
};


export const setRequestBody = (req: RequestInit, payload: Payload): void => {
  if (payload) Reflect.set(req, 'body', JSON.stringify(payload));
};



export default {
  apply: (target, _this, args: FetcherParams) => target(...args),
  get: (target, prop: RequestMethod) => {
    switch (prop) {

    case RequestMethod.Post:
    case RequestMethod.Put:
    case RequestMethod.Patch:
      return (...args: FetcherParamsWithPayload) => {
        const [ url, payload = null, reqInit = {} ] = args;

        setRequestMethod(reqInit, prop);
        setRequestBody(reqInit, payload);

        return target(url, reqInit);
      };

    case RequestMethod.Delete:
    case RequestMethod.Get:
      return (...args: FetcherParams) => {
        const [ url, reqInit = {} ] = args;

        setRequestMethod(reqInit, prop);

        return target(url, reqInit);
      };

    default:
      return (args: FetcherParams) => target(...args);
    }
  }
} as ProxyHandler<Fetcher>;
