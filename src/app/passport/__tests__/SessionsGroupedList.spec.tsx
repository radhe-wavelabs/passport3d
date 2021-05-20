import React from 'react';
import { mount } from 'enzyme';
import { EventPrivateDetailsResponseType } from '../../../lib/api/protected';
import GroupedList from '../SessionWrapper/GroupedList';
import SessionsPagination from '../SessionWrapper/SessionsPagination';
import TogglePastSessionsBtn from '../SessionWrapper/TogglePastSessionsBtn';
import FilterDatesDropdown from '../SessionWrapper/FilterDatesDropdown';

const mockEventData: EventPrivateDetailsResponseType = {
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
  showcaseEnabled: false,
  sessionEnabled: true,
  agendaEnabled: true,
  preventJoinEnabled: false,
  preventJoinBefore: 0,
  welcomeKnovioEnabled: false
};
const mockMeetingData = {
  meetingId: '1',
  startDateTime: '2020-10-30T21:00:00Z',
  endDateTime: '2020-09-30T21:00:00Z',
  topic: 'topic',
  type: 'SCHEDULED',
  notes: '',
  organizations: [],
  connectionDetails: 'details',
  access: 'Open',
  track: 'track'
};
const mockMeetingsListData = {
  'Wednesday 1/1': [mockMeetingData]
};

const expectCount = 1;

describe('GroupedList', () => {
  describe('GroupedList initializing', () => {
    it('should render GroupedList', () => {
      const wrapper = mount(<GroupedList meetings={mockMeetingsListData} event={mockEventData} />);
      expect(wrapper.length).toBe(expectCount);
    });
    it('should render SessionsPagination', () => {
      const wrapper = mount(<GroupedList meetings={mockMeetingsListData} event={mockEventData} />);
      expect(wrapper.find(SessionsPagination).length).toBe(expectCount);
    });
    it('should render FilterDatesDropdown', () => {
      const wrapper = mount(<GroupedList meetings={mockMeetingsListData} event={mockEventData} />);
      expect(wrapper.find(FilterDatesDropdown).length).toBe(expectCount);
    });
    it('should render TogglePastSessionsBtn', () => {
      const mockFutureMeetingsListData = {
        ...mockMeetingsListData,
        'Wednesday 1/2': [{
          ...mockMeetingData,
          endDateTime: '2099-09-30T21:00:00Z'
        }]
      };
      const wrapper = mount(<GroupedList meetings={mockFutureMeetingsListData} event={mockEventData} />);
      expect(wrapper.find(TogglePastSessionsBtn));
    });
  });

  describe('GroupedList classes for editing', () => {
    const className = 'editable-session';
    it('it should find classes from array', () => {
      const wrapper = mount(<GroupedList meetings={mockMeetingsListData} event={mockEventData} />);
      const classes = [
        `${className}--header`,
        `${className}--header-right`,
        `${className}--table-header`,
        `${className}--table-header-left`,
        `${className}--table-header-right`,
        `${className}--table-row`,
        `${className}--table-row-left`,
        `${className}--table-row-right`,
        `${className}--table-row-right-tile`,
      ];
      classes.forEach(className => {
        expect(wrapper.find('.'+className)).toHaveLength(expectCount);
      });
    });
  });
});
