import useSetKeyIdClass from '../use-set-key-id-class';
import { getPathName } from '../../lib/helpers/text-formatters';

describe('useSetKeyIdClass', () => {
  const pathnames = ['', '/session', '/agenda'];
  const { location } = window;
  beforeAll((): void => {
    delete window.location;
    window.location = {
      pathname: '',
    };
  });
  afterAll((): void => {
    window.location = location;
  });

  it(`should return path names`, () => {
    pathnames.forEach(path => {
      window.location.pathname = path;
      expect(useSetKeyIdClass()).toEqual(getPathName(path));
    });
  });
});