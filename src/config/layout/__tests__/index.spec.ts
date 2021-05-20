import { SHOWCASE_PATH } from '../../routes/paths';
import { PassportLayoutConfig } from '../index';

describe('Layout configuration', () => {
  const HEADER = 'header', MAIN = 'main', FOOTER = 'footer';

  describe('Passport app layout config', () => {
    let cnf: PassportLayoutConfig;
    beforeEach(() => {
      jest.resetModules();
      process.env['REACT_APP_PROFILE'] = 'passport';
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      cnf = require('../index').default;
    });

    it('should support children and className for all config items', () => {
      [HEADER, MAIN, FOOTER].forEach(cnfItem => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        expect(require('../index').default[cnfItem].className).toBeTruthy();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        expect(require('../index').default[cnfItem].children).toBeTruthy();
      });
    });

    it('should support children for "header" option', () => {
      expect(cnf[HEADER].children).toBeTruthy();
    });
    it('should support children for "main" option', () => {
      expect(cnf[MAIN].children).toBeTruthy();
    });
    it('should support children for "footer" option', () => {
      expect(cnf[FOOTER].children).toBeTruthy();
    });

    describe('"Showcase" route layout config option', () => {
      const mainClassName = 'showcase-content-wrapper';
      it('should not include footer children', () => {
        expect(cnf.routeLayoutConfig[SHOWCASE_PATH].footer?.children).toEqual(null);
      });
      it('should use own styles for main container', () => {
        expect(cnf.routeLayoutConfig[SHOWCASE_PATH].main?.className).toEqual(mainClassName);
      });
    });
  });

  describe('MeetLinks app layout', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env['REACT_APP_PROFILE'] = 'meet';
    });

    it('should support main option with custom className', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../index').default[MAIN].className).toBeDefined();
    });
    it('should not support "footer" options', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../index').default[FOOTER].children).toEqual(null);
    });
  });
});
