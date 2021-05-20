import * as PATHS from '../paths';
import { RoutesConfig } from '../index';

describe('App routes', () => {
  describe('Passport routes', () => {
    beforeEach(jest.resetModules);
    process.env['REACT_APP_PROFILE'] = 'passport';

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const passportRoutes = require('../index').default;

    it('should allow only root and not-found routes without unathentication', () => {
      const _paths = Object.entries(passportRoutes as RoutesConfig)
        .filter(([path, cnf]) => !cnf['_protected'] === true)
        .map(([path]) => path);

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      expect(_paths).toHaveLength(3);
      expect(_paths.includes(PATHS.ROOT)).toBeTruthy();
      expect(_paths.includes(PATHS.NOT_FOUND_PATH)).toBeTruthy();
      expect(_paths.includes(PATHS.REGISTRATION_PATH)).toBeTruthy();
    });
  });
  describe('MeetLinks routes', () => {
    beforeEach(jest.resetModules);
    process.env['REACT_APP_PROFILE'] = 'meet';

    it('should contains only two routes', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-magic-numbers
      expect(Object.keys(require('../index').default)).toHaveLength(2);
    });

    it('should render nothing with root route', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const root = require('../index').default[PATHS.ROOT];
      expect(root.component).not.toBeDefined();
      expect(root.exact).toEqual(true);
    });
  });
});
