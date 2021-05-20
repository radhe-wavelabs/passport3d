import useEventSubdomain from '../use-event-subdomain';

describe('useEventSubdomain', () => {
  const url = 'http://custom.domain.net';

  it('should return "null" when url is invalid', () => {
    expect(useEventSubdomain('invalidUrl')).toBeNull();
  });
  it('should return subdomain', () => {
    expect(useEventSubdomain(url)).toEqual('custom');
  });
  it('should use global browser location if not url provided', () => {
    expect(useEventSubdomain()).toEqual('localhost');
  });
});
