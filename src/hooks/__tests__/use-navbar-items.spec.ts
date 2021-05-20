import { getConfigByPath } from '../use-navbar-items';
import { AGENDA_PATH, SHOWCASE_PATH, SUPPORT_PATH, WELCOME_PATH, SESSION_PATH } from '../../config/routes/paths';

describe('configureByPath', () => {
  const mockTrueResponse = {
    welcomeEnabled: true,
    welcomeLabel: 'welcome',
    showcaseEnabled: true,
    showcaseLabel: 'string',
    welcomeKnovioEnabled: true,
    preventJoinEnabled: true,
    supportLabel: 'string',
    supportEnabled: true,
    agendaLabel: 'string',
    agendaEnabled: true,
    sessionEnabled: true,
    sessionLabel: 'string',
    eventId: 1,
    name: 'string',
    subdomain: 'string',
    publicDescription: 'string',
    startTime: 'string',
    endTime: 'string',
    timeZone: 'string',
    footerLinks: [{
      order: 1,
      label: 'string',
      url: 'string'
    }]
  };
  const mockDisabledResponse = {
    welcomeEnabled: false,
    welcomeLabel: 'string',
    showcaseEnabled: false,
    showcaseLabel: 'string',
    welcomeKnovioEnabled: true,
    preventJoinEnabled: true,
    supportLabel: 'string',
    supportEnabled: false,
    agendaLabel: 'string',
    agendaEnabled: false,
    sessionEnabled: false,
    sessionLabel: 'string',
    eventId: 1,
    name: 'string',
    subdomain: 'string',
    publicDescription: 'string',
    startTime: 'string',
    endTime: 'string',
    timeZone: 'string',
    footerLinks: [{
      order: 1,
      label: 'string',
      url: 'string'
    }]
  };
  const mockFalseResponse = {
    welcomeEnabled: true,
    welcomeLabel: 'Welcome',
    showcaseEnabled: true,
    showcaseLabel: '',
    welcomeKnovioEnabled: true,
    preventJoinEnabled: true,
    supportLabel: '',
    supportEnabled: true,
    agendaLabel: '',
    agendaEnabled: true,
    sessionEnabled: true,
    sessionLabel: '',
    eventId: 1,
    name: 'string',
    subdomain: 'string',
    publicDescription: 'string',
    startTime: 'string',
    endTime: 'string',
    timeZone: 'string',
    footerLinks: [{
      order: 1,
      label: 'string',
      url: 'string'
    }]
  };

  test.each`
    input     | expectedResult
    ${'abc'}  | ${ null }
    ${WELCOME_PATH}   | ${{ to: WELCOME_PATH, label: mockTrueResponse.welcomeLabel }}
    ${AGENDA_PATH}   | ${{ to: AGENDA_PATH, label: mockTrueResponse.agendaLabel }}
    ${SHOWCASE_PATH}   | ${{ to: SHOWCASE_PATH, label: mockTrueResponse.showcaseLabel }}
    ${SESSION_PATH}   | ${{ to: SESSION_PATH, label: mockTrueResponse.sessionLabel }}
    ${SUPPORT_PATH}   | ${{ to: SUPPORT_PATH, label: mockTrueResponse.supportLabel }}
  `('converts $input to $expectedResult', ({ input, expectedResult }) => {
  expect(getConfigByPath(input, mockTrueResponse)).toStrictEqual(expectedResult);
});
  test.each`
    input     | expectedResult
    ${WELCOME_PATH}   | ${{ to: WELCOME_PATH, label: 'Welcome' }}
    ${AGENDA_PATH}   | ${{ to: AGENDA_PATH, label: 'My Schedule' }}
    ${SHOWCASE_PATH}   | ${{ to: SHOWCASE_PATH, label: 'Showcase' }}
    ${SESSION_PATH}   | ${{ to: SESSION_PATH, label: 'General session' }}
    ${SUPPORT_PATH}   | ${{ to: SUPPORT_PATH, label: 'Support' }}
  `('converts $input to $expectedResult', ({ input, expectedResult }) => {
  expect(getConfigByPath(input, mockFalseResponse)).toStrictEqual(expectedResult);
});
  test.each`
    input     | expectedResult
    ${WELCOME_PATH}   | ${ null }
    ${SHOWCASE_PATH}   | ${ null }
    ${SESSION_PATH}   | ${ null }
    ${SUPPORT_PATH}   | ${ null }
    ${AGENDA_PATH}    | ${ null }
  `('converts $input to $expectedResult', ({ input, expectedResult }) => {
  expect(getConfigByPath(input, mockDisabledResponse)).toStrictEqual(expectedResult);
});
});

