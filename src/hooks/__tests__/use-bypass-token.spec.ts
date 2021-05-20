import useBypassToken from '../use-bypass-token';
import { BYPASS_TOKEN_KEY } from '../../lib/constants';

describe('useBypassToken', () => {
  it(`should parse urlQuery for ${BYPASS_TOKEN_KEY} and return it's value or null`, () => {
    expect(useBypassToken()).toEqual(null);
  });
});
