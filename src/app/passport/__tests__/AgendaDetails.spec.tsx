import React from 'react';
import { mount, shallow } from 'enzyme';
import AgendaDetails from '../AgendaWrapper/AgendaDetails';
import * as eventApi from '../../../hooks/api/protected/use-event-private-meeting-list';
import { Button } from "../../../components/_base/Button";
import { EventPrivateDetailsResponseType } from '../../../lib/api';

jest.mock('../../../hooks/use-event-id', () => ({
  useEventId: () => '5'
}));

const SECOND_ELEMENT = 2;
const currentDate = new Date();
const differenceInDays = 2;

const mockEvent: EventPrivateDetailsResponseType = {
  endTime: '2020-09-30T21:00:00Z',
  startTime: '2020-10-30T21:00:00Z',
  name: 'Test',
  eventId: 5,
  timeZone: 'Atlantic/Azores',
  subdomain: 'test',
  publicDescription: 'test',
  logoUrl: 'logoUrl',
  logoTitle: 'logoTitle',
  agendaEnabled: true,
  welcomeEnabled: true,
  sessionEnabled: true,
  footerLinks: [],
  showcaseEnabled: false,
  welcomeKnovioEnabled: false,
  preventJoinEnabled: false,
  supportEnabled: false,
  sessionLinkDescription: 'test',
  customCss: ''
};

const mockMeetingsList = {
  pastMeetings: [],
  futureMeetings: [],
};

const mockMeetingsListFutureMeetings = {
  pastMeetings: [],
  futureMeetings: [
    {
      access: 'CLOSED',
      connectionDefined: false,
      connectionDetails: '',
      endDateTime: currentDate.getDate() + differenceInDays,
      eventEndDateTime: null,
      eventId: 5,
      eventName: null,
      eventStartDateTime: null,
      footerLinks: null,
      hostOrganizations: null,
      joinStatus: null,
      meetingId: 10291,
      notes: '',
      participantOrganizations: [],
      presenterOrganizations: null,
      registrantOrganizations: null,
      startDateTime: currentDate.getDate(),
      timeZone: null,
      topic: '',
      track: null,
      type: '',
    }
  ],
};

const expectCount = 1;

describe('AgendaDetails', () => {
  let useEventPrivateMeetingsListMock: jest.SpyInstance;

  beforeEach(() => {
    useEventPrivateMeetingsListMock = jest.spyOn(eventApi, 'useEventPrivateMeetingsList');
    useEventPrivateMeetingsListMock.mockImplementation(() => { return { data: mockMeetingsList }; });
  });

  afterEach(() => {
    useEventPrivateMeetingsListMock.mockRestore();
  });

  describe('AgendaWrapper initializing', () => {
    it('should render AgendaDetails', () => {
      const wrapper = mount(<AgendaDetails event={mockEvent} />);
      expect(wrapper.find(AgendaDetails)).toHaveLength(expectCount);
    });
  });

  it('should render correct props', () => {
    const wrapper = mount(<AgendaDetails event={mockEvent} />);
    expect(wrapper.prop('event')).toMatchObject(mockEvent);
  });

  it('should render button', () => {
    const wrapper = shallow(<AgendaDetails event={mockEvent} />);
    expect(wrapper.find(Button)).toHaveLength(expectCount);
  });

  it('should render empty list message', () => {
    const wrapper = shallow(<AgendaDetails event={mockEvent} />);
    expect(wrapper.childAt(SECOND_ELEMENT).text()).toContain('No meetings have been added to  yet.');
  });

  it('should render agenda link description', () => {
    const wrapper = shallow(<AgendaDetails event={mockEvent} />);
    expect(wrapper.find('p').text()).toContain('test');
  });

  describe('AgendaWrapper classes for editting', () => {
    const className = 'editable-agenda';
    it('should should find classes from array', () => {
      const classes = [
        `${className}--wrapper`,
        `${className}--footer`,
      ];
      const wrapper = shallow(<AgendaDetails event={mockEvent} />);
      classes.forEach(className => {
        expect(wrapper.find('.' + className)).toHaveLength(expectCount);
      });
    });

    it('should should find class "editable-agenda--upcoming-meeting"', () => {
      const editibleClassName = `${className}--upcoming-meeting`;
      useEventPrivateMeetingsListMock.mockImplementation(() => { return { data: mockMeetingsListFutureMeetings }; });
      const wrapper = shallow(<AgendaDetails event={mockEvent} />);
      expect(wrapper.find('.' + editibleClassName)).toHaveLength(expectCount);
    });
  });

});
