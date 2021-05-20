import { JSDOM } from 'jsdom';
import { composeUrl, getUrlQueryArgByKey, getKvEnvPrefix, getKvContentKnovioUrl, getKvThumbnailUrl } from '../utils';

beforeAll(() => {
  Object.defineProperty(global, 'window', {
    value: (new JSDOM(``, { url: "https://localhost/?token=123" })).window
  });
});

describe('API Utils', () => {
  describe('composeUrl', () => {
    const apiRootMock = 'API_ROOT';
    process.env.REACT_APP_API_ROOT = apiRootMock;
    process.env.REACT_APP_FE_ENV = process.env.REACT_APP_FE_ENV || 'development';

    it('should start with REACT_APP_API_ROOT', () => {
      expect(composeUrl().startsWith(apiRootMock)).toBeTruthy();
    });
    it('should compose url paths by provided parameters', () => {
      const a = 'test1', b = 'test2';
      expect(composeUrl(a, b)).toEqual(apiRootMock + '/' + a + '/' + b );
    });
  });

  describe('getUrlQueryArgByKey', () => {
    const url = 'http://localhost/?a=false&q=true';

    it('should return "null" when params are invalid', () => {
      expect(getUrlQueryArgByKey('', 'invalidUrl')).toBeNull();
    });
    it('should return query arg value if exists in url or "null"', () => {
      expect(getUrlQueryArgByKey('q', url)).toEqual('true');
      expect(getUrlQueryArgByKey('token', url)).toBeNull();
    });
    it('should use global browser url if not provided', () => {
      expect(getUrlQueryArgByKey('token')).toEqual('123');
    });
  });
  describe('getKVEnvPrefix', () => {
    it('should return part of url related to the environment', () => {
      expect(getKvEnvPrefix('development')).toEqual('dev-');
      expect([getKvEnvPrefix('stage'), getKvEnvPrefix('qa')].every(v => v === 'stage-')).toBeTruthy();
      expect(getKvEnvPrefix('prod')).toEqual('');
      expect(getKvEnvPrefix('xyz')).toBeUndefined();
    });
  });
  it(`${getKvContentKnovioUrl.name} should return Knovio presentation url`, () => {
    expect(getKvContentKnovioUrl('embedCodeId')).toEqual(`https://${getKvEnvPrefix()}view.knowledgevision.com/presentation/embedCodeId`);
    expect(getKvContentKnovioUrl('')).toEqual(`https://${getKvEnvPrefix()}view.knowledgevision.com/presentation/`);
  });
  it(`${getKvThumbnailUrl.name} should return Knovio Thumbnail url with play icon by default`, () => {
    expect(getKvThumbnailUrl('embedCodeId')).toEqual(`https://${getKvEnvPrefix()}view.knowledgevision.com/thumbnail/embedCodeId?play_icon=true`);
  });
});
