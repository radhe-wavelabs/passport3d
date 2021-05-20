import usePasscodeStore from '../use-passcode-store';
import Cookie from 'js-cookie';
import { PASSCODE_KEY, PASSCODE_EXPIRATION_DAYS as expires } from '../../lib/constants';

const path = '/_path';
const passcodeValue = 'passcode_value';
const mockFn = jest.fn(() => '_path');
jest.mock('../use-meeting-path', () => () => mockFn());

Cookie.set = jest.fn();
Cookie.get = jest.fn();

describe('usePasscodeStore', () => {
  const { storePasscode, getPasscode } = usePasscodeStore();

  it('should store passcode with 7 days expiration and path', () => {
    storePasscode(passcodeValue);
    expect(Cookie.set).toHaveBeenCalledWith(PASSCODE_KEY, passcodeValue, { expires, path });
  });
  it('should get stored "passcode" ', () => {
    getPasscode();
    expect(Cookie.get).toHaveBeenCalledWith(PASSCODE_KEY);
  });
});
