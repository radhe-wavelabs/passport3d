import React from 'react';
import { mount } from 'enzyme';
import SessionMeetingsTile from '../SessionWrapper/SessionMeetingsTile';
import { Button } from '../../../components/_base/Button';
import { EventPrivateDetailsResponseType } from '../../../lib/api';

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
  welcomeEnabled: true,
  supportEnabled: true,
  preventJoinEnabled: false,
  preventJoinBefore: 0,
  welcomeKnovioEnabled: false,
  footerLinks: [],
  sessionLinkDescription: 'test',
  customCss: ''
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
  track: 'track',
  connectionDefined: false
};

const expectCount = 1;
const expectTwoCount = 2;

describe('SessionMeetingsTile', () => {
  const props = {
    meeting: mockMeetingData,
    event: mockEventData,
    isExpandedView: true,
    changeJoinStatus: jest.fn
  };

  describe('SessionMeetingsTile initializing', () => {
    it('should render SessionMeetingsTile', () => {
      const wrapper = mount(<SessionMeetingsTile {...props}/>);
      expect(wrapper.length).toBe(expectCount);
    });

    it('should render Button', () => {
      const wrapper = mount(<SessionMeetingsTile {...props}/>);
      expect(wrapper.find(Button).length).toBe(expectCount);
    });
  });

  describe('SessionMeetingsTile classes for editing', () => {
    const className = 'editable-session';
    it('it should find classes from array', () => {
      const wrapper = mount(<SessionMeetingsTile {...props}/>);
      const classes = [
        `${className}--table-cell-title`,
        `${className}--table-cell-buttons`,
      ];
      classes.forEach(className => {
        expect(wrapper.find('.'+className)).toHaveLength(expectCount);
      });
    });

    it('it should find classes for buttons', () => {
      mockMeetingData.access = 'OPEN';
      const wrapper = mount(<SessionMeetingsTile {...props}/>);
      expect(wrapper.find(`.${className}--table-cell-btn-join`)).toHaveLength(expectTwoCount);
      expect(wrapper.find(`.${className}--table-cell-btn-join`)).toHaveLength(expectTwoCount);
    });
  });
});
