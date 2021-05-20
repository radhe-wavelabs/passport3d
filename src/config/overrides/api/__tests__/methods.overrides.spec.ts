import { RequestMethod } from '../../../api';
import handler, { setRequestBody, setRequestMethod } from '../methods.overrides';


const mockFetch = jest.fn().mockImplementation((...args: never[]) => args);
const apiProxy = new Proxy(mockFetch, handler) as ProxyHandler<typeof mockFetch>;

describe('Fetch Request Methods overrides as Proxy handler', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  const url = 'url', headers = { 'Custom-Header': 'custom_value' }, email = 'mail@mail.com';

  [RequestMethod.Get, RequestMethod.Delete]
    .forEach((method) => {
      it(`request method ${method} should be used as "method" in RequestInit config`, () => {
        Reflect.get(apiProxy, method)(url);
        expect(mockFetch).toHaveBeenCalledWith(url, { method });
      });
    });

  [RequestMethod.Post, RequestMethod.Put, RequestMethod.Patch]
    .forEach((method) => {
      it(`request method ${method} should compose RequestInit with "payload" and "reqInit" if provided as parameters`, () => {
        const payload = { email };
        Reflect.get(apiProxy, method)(url, { email }, { headers });
        const expectedReqInit = { method, body: JSON.stringify(payload), headers };
        expect(mockFetch).toHaveBeenCalledWith(url, expectedReqInit);
      });
      it(`request method ${method} should use defaults if no parameters provided`, () => {
        Reflect.get(apiProxy, method)(url);
        expect(mockFetch).toHaveBeenCalledWith(url, { method });
      });
    });

  it('should set request method as a part of requestInit', () => {
    const reqInit = {};
    setRequestMethod(reqInit, RequestMethod.Put);
    expect(reqInit).toEqual({ method: RequestMethod.Put });
  });

  it('should set payload as body as a part of requestInit', () => {
    const reqInit = {}; const payload = { email: 'mail@mail.com' };
    setRequestBody(reqInit, payload);
    expect(reqInit).toEqual({ body: JSON.stringify(payload) });
  });

  it('should call FetchProxy as default if request method does not match', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const proxy = new Proxy(mockFetch, handler) as Record<string, any>;
    const params = ['url', { method: RequestMethod.Get }];
    proxy['HEAD'](params);
    expect(mockFetch).toHaveBeenCalledWith(...params);
  });

  it('should be able to call FetchProxy as function', () => {
    const proxy = new Proxy(mockFetch, handler);
    proxy('url');
    expect(mockFetch).toHaveBeenCalledWith('url');
  });

});
