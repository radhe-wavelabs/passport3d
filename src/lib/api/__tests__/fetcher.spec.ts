import { HTTP_STATUS } from '../../../config/api';
import { fetcher } from '../fetcher';

describe('fetcher by invoking global FetchAPI', () => {
  const mockFn = jest.fn();
  const resolved = true;
  const mockResponse = { ok: true, json: () => ({ resolved }) };
  const mockUrl = 'mock.url', reqInit = {};

  it('should return response if "ok"', async () => {
    global.fetch = mockFn.mockResolvedValue(mockResponse);
    await fetcher(mockUrl, reqInit);
    expect(mockFn).toHaveBeenCalledWith(mockUrl, reqInit);
  });
  it('should return an empty object if "ok" and no Response', async () => {
    global.fetch = mockFn.mockResolvedValue({ ...mockResponse, status: HTTP_STATUS.NO_CONTENT });
    const response = await fetcher(mockUrl, reqInit);
    expect(response).toEqual({});
  });
  it('should return an Error if request is "not ok"', async () => {
    const url = 'https://url';
    global.fetch = mockFn.mockResolvedValue({ json: () => Promise.resolve({ }), status: HTTP_STATUS.BAD_REQUEST, ok: false, url });
    try {
      await fetcher(mockUrl, reqInit);
    } catch (e) {
      expect(e).toEqual(new Error(`Fetching the resource mock.url failed`));
      expect(e.ok).toBeFalsy();
      expect(e.status).toEqual(HTTP_STATUS.BAD_REQUEST);
      expect(e.url).toEqual(url);
    }
  });
});
