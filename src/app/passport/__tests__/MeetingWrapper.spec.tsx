import React from 'react';
import { mount } from 'enzyme';
import MeetingWrapper from '../MeetingWrapper/MeetingWrapper';
import EventDetails from '../../shared/EventDetails';
import MeetingDetails from '../../shared/MeetingDetails';
import * as eventApi from '../../../hooks/api/public/use-event-public-details';
import * as meetingApi from '../../../hooks/api/protected/use-meeting-private-details';
import * as meetingIdApi from '../../../hooks/use-meeting-id';
import * as eventIdApi from '../../../hooks/use-event-id';

const mockEventData = {
  endTime: '2020-09-30T21:00:00Z',
  startTime: '2020-10-30T21:00:00Z',
  name: 'Test',
  eventId: 5,
  timeZone: 'Atlantic/Azores',
  subdomain: 'test',
  publicDescription: 'test'
};
const mockMeetingData = {
  startDateTime: '2020-10-30T21:00:00Z',
  endDateTime: '2020-09-30T21:00:00Z',
  timeZone: 'Helsinki/Europe',
  topic: 'topic',
  type: 'SCHEDULED',
  notes: '',
  organizations: [],
  connectionDetails: 'details',
  eventEndDateTime: '2020-11-30T21:00:00Z',
  eventStartDateTime: '2020-11-30T21:00:00Z',
  eventName: 'evenName'
};

const expectCount = 1;

describe('MeetingWrapper', () => {
  let useMeetingIdMock: jest.SpyInstance;
  let useEventIdMock: jest.SpyInstance;
  let useEventPublicInfoMock: jest.SpyInstance;
  let useMeetingPrivateDetailsMock: jest.SpyInstance;

  beforeEach(() => {
    useMeetingIdMock = jest.spyOn(meetingIdApi, 'useMeetingId');
    useMeetingIdMock.mockImplementation(() => '1');
    useEventIdMock = jest.spyOn(eventIdApi, 'useEventId');
    useEventIdMock.mockImplementation(() => '1');
    useEventPublicInfoMock = jest.spyOn(eventApi, 'useEventPublicInfo');
    useEventPublicInfoMock.mockImplementation(() => mockEventData);
    useMeetingPrivateDetailsMock = jest.spyOn(meetingApi, 'useMeetingPrivateDetails');
    useMeetingPrivateDetailsMock.mockImplementation(() => mockMeetingData);
  });

  afterEach(() => {
    useEventPublicInfoMock.mockRestore();
    useMeetingPrivateDetailsMock.mockRestore();
  });

  describe('MeetingWrapper initializing', () => {

    it('should render MeetingWrapper', () => {
      const wrapper = mount(<MeetingWrapper/>);
      expect(wrapper.length).toBe(expectCount);
    });

    it('should render EventDetails', () => {
      const wrapper = mount(<MeetingWrapper/>);
      expect(wrapper.find(EventDetails));
    });

    it('should render AgendaDetails', () => {
      const wrapper = mount(<MeetingWrapper/>);
      expect(wrapper.find(MeetingDetails));
    });
  });
});
