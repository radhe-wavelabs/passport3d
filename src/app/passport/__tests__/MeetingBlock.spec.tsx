import React from 'react';
import { mount } from 'enzyme';
import MeetingBlock from "../AgendaWrapper/MeetingBlock";

const mockData = {
  startDateTime: '2020-10-30T21:00:00Z',
  endDateTime: '2020-09-30T21:00:00Z',
  timeZone: 'Helsinki/Europe',
  topic: '',
  type: 'SCHEDULED',
  notes: 'notes',
  organizations: [],
  participantOrganizations: ['pax org'],
  connectionDetails: 'details',
  eventEndDateTime: '2020-11-30T21:00:00Z',
  eventStartDateTime: '2020-11-30T21:00:00Z',
  eventName: 'evenName',
  meetingId: '1',
  track: 'track',
};

const expectCount = 1;

describe('MeetingBlock', () => {

  describe('MeetingBlock initializing', () => {

    it('should render MeetingBlock', () => {
      const wrapper = mount(
        <MeetingBlock
          meeting={{
            ...mockData,
            access: 'string',
            presenterOrganizations: [{ name: 'presenter org', organizationId: 1, attendees: []}]
          }}
          timeZone=''
          eventId='1'
        />
      );
      expect(wrapper.length).toBe(expectCount);
    });

    it('should render closed Meeting', () => {
      const wrapper = mount(
        <MeetingBlock
          meeting={{
            ...mockData,
            access: 'CLOSED',
            presenterOrganizations: [{ name: 'presenter org', organizationId: 1, attendees: []}]
          }}
        />
      );
      expect(wrapper.length).toBe(expectCount);
    });
  });
  
  describe('MeetingBlock classes for editing', () => {
    it('should find classes from array', () => {
      const wrapper = mount(<MeetingBlock meeting={mockData} timeZone='' eventId='1'/>);
      const className = 'editable-agenda';
      const classes = [
        `${className}--block`, 
        `${className}--block-date`,
        `${className}--block-attendees`,
        `${className}--block-button`
      ];
      classes.forEach(className => {
        expect(wrapper.find('.'+className)).toHaveLength(expectCount);
      });
    });
  });
});