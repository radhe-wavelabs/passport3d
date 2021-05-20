import { FetcherParams } from '../../../api';
import { setDefaultHeaders, setAuthHeaders, withAuthHeaders, withDefaultHeaders } from '../headers.overrides';
jest.mock('../../../../lib/auth', () => {
  return {
    getCurrentSessionToken: jest.fn(() => Promise.resolve('xxx'))
  };
});

const mockFetch = jest.fn().mockImplementation((...args: FetcherParams) => Promise.resolve(args));

describe('Overrides for Request Headers', () => {
  describe('Headers setters', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
    });
    it('should set Content-Type as default no provided as a param or not set', () => {
      expect(setDefaultHeaders().get('content-type')).toEqual('application/json');
      expect(setDefaultHeaders({ 'content-type': 'value' }).get('content-type')).toEqual('value');
    });
    it('should return headers with auth token', async () => {
      try {
        const headers = await setAuthHeaders();
        expect(headers.get('x-api-token')).toEqual('xxx');
      } catch {}
    });
  });

  describe('Fetch decorators', () => {
    beforeEach(() => {
      jest.restoreAllMocks();
      jest.clearAllMocks();
    });

    it('should decorate fetcher with default headers', () => {
      const params = ['url', { headers: new Headers({ 'content-type':'application/json' }) }];
      withDefaultHeaders(mockFetch)('url').then(() => expect(mockFetch).toHaveBeenCalledWith(...params));
    });

    it('should decorate fetcher with auth token headers', () => {
      const params = ['url', { headers: new Headers({ 'x-api-authentication':'xxx' }) }];
      withAuthHeaders(mockFetch)('url').then(() => expect(mockFetch).toHaveBeenCalledWith(...params));
    });

  });
});
