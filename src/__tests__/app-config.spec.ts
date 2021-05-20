import { getRuntimeValueByKey, getProfileConfig } from '../app-config';


import envProfileCnf from '../profile.config.json';

// delete process.env.REACT_APP_PROFILE;

const
  envKey = '_KEY',
  envValue = '_VALUE',
  PASSPORT = 'passport',
  MEET_LINKS = 'meet'
;

global.process.env[envKey] = envValue;
describe('Application Configuration', () => {

  describe('getRuntimeValueByKey', () => {
    it('should get env value by key', () => {
      expect(getRuntimeValueByKey(envKey)).toEqual(envValue);
    });
    it('should throw an Error when env variable is not set', () => {
      const key = 'not_set_key';
      try {
        getRuntimeValueByKey(key);
      } catch(e) {
        expect(e.message).toEqual(`Required parameter ${key} not set`);
      }
    });
  });

  describe(`${PASSPORT} profile`, () => {
    beforeEach(() => {
      jest.resetModules();
      process.env['REACT_APP_PROFILE'] = PASSPORT;
    });
    const passportProfileCnf = envProfileCnf['REACT_APP_PROFILE'][PASSPORT];

    it('should return passport env var mapping object when building Passport app', () => {
      expect(getProfileConfig()).toEqual(passportProfileCnf);
    });

    it('should set isPassportProfile to return true', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../app-config').isPassportProfile()).toBeTruthy();
    });
    it('should set isMeetLinksProfile to return false', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../app-config').isMeetLinksProfile()).toBeFalsy();
    });
    it('getRuntimeConfig should return config object required for Passport', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../app-config').getRuntimeConfig()).toHaveProperty('userPoolId');
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../app-config').getRuntimeConfig()).toHaveProperty('userPoolWebClientId');
    });
  });
  describe(`${MEET_LINKS} profile`, () => {
    process.env.REACT_APP_PROFILE = MEET_LINKS;
    beforeEach(() => {
      jest.resetModules();
      process.env.REACT_APP_PROFILE = MEET_LINKS;
    });

    const meetLinksProfileCnf = envProfileCnf['REACT_APP_PROFILE'][MEET_LINKS];

    it('should return meet env var mapping object when building MeetLinks app', () => {
      expect(getProfileConfig()).toEqual(meetLinksProfileCnf);
    });

    it('should set isMeetLinksProfile to return true', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../app-config').isMeetLinksProfile()).toBeTruthy();
    });
    it('should set isPassportProfile to return false', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../app-config').isPassportProfile()).toBeFalsy();
    });
    it('getRuntimeConfig should return mapped MeetLinks config object', () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      expect(require('../app-config').getRuntimeConfig()).toEqual({});
    });
  });

});
