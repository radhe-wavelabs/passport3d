import React from 'react';
import { mount, shallow } from 'enzyme';
import EventDetails from '../../shared/EventDetails';
import * as eventApi from '../../../hooks/api/protected/use-event-private-details';
import * as meetingList from '../../../hooks/api/protected/use-private-session-meeting-list';

import { EventPrivateDetailsResponseType } from '../../../lib/api';
import SessionWrapper from '../SessionWrapper/SessionWrapper';
import SessionMeetingsList from '../SessionWrapper/SessionMeetingsList';

const mockData: EventPrivateDetailsResponseType = {
  endTime: '2020-09-30T21:00:00Z',
  startTime: '2020-10-30T21:00:00Z',
  name: 'Test',
  eventId: 5,
  timeZone: 'Atlantic/Azores',
  subdomain: 'test',
  publicDescription: 'test',
  privateDescription: 'privateDescription',
  logoUrl: 'logoUrl',
  logoTitle: 'logoTitle',
  footerLinks: [],
  showcaseEnabled: false,
  sessionEnabled: true,
  agendaEnabled: true,
  supportEnabled: true,
  welcomeEnabled: true,
  preventJoinEnabled: false,
  preventJoinBefore: 0,
  welcomeKnovioEnabled: false
};

const data = [
  {
    access: 'OPEN',
    attendeeLink: '',
    connectionDefined: false,
    connectionDetails: '',
    connectionLink: null,
    embedCodeId: null,
    endDateTime: '2021-03-19T14:15:00Z',
    eventEndDateTime: null,
    eventId: 5,
    eventName: null,
    eventStartDateTime: null,
    footerLinks: null,
    hostOrganizations: null,
    joinStatus: 'JOINED_AS_REGULAR',
    meetingId: 394675,
    meetingInvitation: null,
    notes: '',
    participantOrganizations: null,
    presenterOrganizations: [{ organizationId: 292026, name: 'Balanced Fortune', }],
    registrantOrganizations: null,
    showcasePagePath: '',
    startDateTime: '2021-03-19T13:15:00Z',
    timeZone: null,
    topic: '',
    track: null,
    type: '',
  }
];
const expectCount = 1;

jest.mock('react-router-dom', () => { return { Redirect: () => <span>Mocked redirect</span> }; });

describe('SessionWrapper', () => {
  let useEventPrivateInfoMock: jest.SpyInstance;
  let usePrivateSessionMeetingsListMock: jest.SpyInstance;

  afterEach(() => {
    useEventPrivateInfoMock.mockRestore();
  });

  describe('SessionWrapper initializing', () => {
    beforeEach(() => {
      useEventPrivateInfoMock = jest.spyOn(eventApi, 'useEventPrivateInfo');
      useEventPrivateInfoMock.mockImplementation(() => { return { data: mockData }; });

    });

    it('should render SessionWrapper', () => {
      const wrapper = mount(<SessionWrapper />);
      expect(wrapper.length).toBe(expectCount);
    });

    it('should render EventDetails', () => {
      const wrapper = mount(<SessionWrapper />);
      expect(wrapper.find(EventDetails)).toHaveLength(expectCount);
    });

    it('should render WelcomeBlock', () => {
      const wrapper = mount(<SessionWrapper />);
      expect(wrapper.find(SessionMeetingsList)).toHaveLength(expectCount);
    });
  });
  describe('SessionWrapper should redirect', () => {
    beforeEach(() => {
      useEventPrivateInfoMock = jest.spyOn(eventApi, 'useEventPrivateInfo');
      useEventPrivateInfoMock.mockImplementation(() => {return { data: { ...mockData, sessionEnabled: false }};});
    });

    it('should call redirection if session tab is disabled', () => {
      const wrapper = mount(<SessionWrapper />);
      expect(wrapper.find('span').text()).toEqual('Mocked redirect');
    });
  });

  describe('SessionMeetingsList classes for editing', () => {
    const className = 'editable-session--wrapper';

    beforeEach(() => {
      usePrivateSessionMeetingsListMock = jest.spyOn(meetingList, 'usePrivateSessionMeetingsList');
      usePrivateSessionMeetingsListMock.mockImplementation(() => { return { data }; });
    });

    afterEach(() => {
      usePrivateSessionMeetingsListMock.mockRestore();
    });

    it('it should find class', () => {
      const wrapper = shallow(<SessionMeetingsList event={mockData} />);
      expect(wrapper.find('.' + className)).toHaveLength(expectCount);
    });
  });

});
