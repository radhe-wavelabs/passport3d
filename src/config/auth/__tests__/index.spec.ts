const mockFn = jest.fn(args => jest.requireActual('aws-amplify').Auth.configure(args));
jest.doMock('aws-amplify', function() {
  return { Auth: { configure: mockFn }};
});

describe('Amplify Auth runtime configuration', () => {
  const userPoolWebClientId = 'client_id';
  const userPoolId = 'user_pool_id';
  const endpoint = 'cognito_url';
  process.env['REACT_APP_PROFILE'] = 'passport';
  process.env['REACT_APP_CLIENT_ID'] = userPoolWebClientId;
  process.env['REACT_APP_USER_POOL_ID'] = userPoolId;
  process.env['REACT_APP_COGNITO_URL'] = endpoint;


  beforeEach(jest.resetModules);
  afterEach(jest.clearAllMocks);

  it('should be invoked with Passport profile config', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('../../../app-config').isPassportProfile()).toBeTruthy();
    require('../index');
    expect(mockFn).toBeCalledWith({ userPoolId, userPoolWebClientId, endpoint });
  });

  it('should catch an Error if configuration fails', () => {
    process.env['REACT_APP_USER_POOL_ID'] = 'none';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('../../../app-config').isPassportProfile()).toBeTruthy();
    try {
      require('../index');
    } catch (e) {
      expect(e.message).toEqual("Error: Invalid UserPoolId format.");
    }
  });

  it('should be ignored for non-Passport profile', () => {
    process.env['REACT_APP_PROFILE'] = 'meet';
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    expect(require('../.././../app-config').isPassportProfile()).toBeFalsy();
    require('../index');
    expect(mockFn).not.toBeCalled();
  });
});
