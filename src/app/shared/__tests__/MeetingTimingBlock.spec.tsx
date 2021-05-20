import React from 'react';
import { mount } from 'enzyme';
import MeetingTimingBlock from '../MeetingTimingBlock';

const timeZone = 'Atlantic/Azores';
const mockProps = {
  startDateTime: '2020-10-30T21:00:00Z',
  endDateTime: '2020-09-30T21:00:00Z'
};
const numberOfParagraphs = {
  withMeetDate: 4,
  withoutMeetDate: 3
};
const meetingStageIndex = 2;
const oneDay = 1;
const thirtyMinutes = 30;
const expectCount = 1;

describe('MeetingTimingBlock', () => {
  it('should render correct props', () => {
    const wrapper = mount(<MeetingTimingBlock meetingDetails={mockProps} timeZone={timeZone} />);
    expect(wrapper.prop('meetingDetails')).toMatchObject(mockProps);
  });

  it('should hide date block if we set hideStartDate to false', () => {
    const wrapper = mount(
      <MeetingTimingBlock
        meetingDetails={mockProps}
        timeZone={timeZone}
        hideStartDate={false}
      />);
    expect(wrapper.find('p')).toHaveLength(numberOfParagraphs.withMeetDate);
  });

  it('should hide date block if we set hideStartDate to true', () => {
    const wrapper = mount(
      <MeetingTimingBlock
        meetingDetails={mockProps}
        timeZone={timeZone}
        hideStartDate={true}
      />);
    expect(wrapper.find('p')).toHaveLength(numberOfParagraphs.withoutMeetDate);
  });
  it('should show This meeting is in the past status if a meeting is ended', () => {
    const wrapper = mount(
      <MeetingTimingBlock
        meetingDetails={mockProps}
        timeZone={timeZone}
        hideStartDate={true}
      />);
    expect(wrapper.find('p').at(meetingStageIndex).text()).toEqual('This meeting is in the past');
  });
  it('should show This meeting is in the past status if several meetings are ended', () => {
    const wrapper = mount(
      <MeetingTimingBlock
        meetingDetails={mockProps}
        timeZone={timeZone}
        hideStartDate={true}
        isMultiMeetingsBlock={true}
      />);
    expect(wrapper.find('p').at(meetingStageIndex).text()).toEqual('These meetings are in the past');
  });
  it('should show In progress status if a meeting is in progress', () => {
    const endDateTime = new Date();
    endDateTime.setDate(endDateTime.getDate() + oneDay);
    const meetingDetails = { ...mockProps, endDateTime };
    const wrapper = mount(
      <MeetingTimingBlock
        meetingDetails={meetingDetails}
        timeZone={timeZone}
        hideStartDate={true}
      />);
    expect(wrapper.find('p').at(meetingStageIndex).text()).toEqual('In progress');
  });
  it('should show time to meeting start if a meeting is in the future', () => {
    const endDateTime = new Date();
    const startDateTime = new Date();
    endDateTime.setMinutes(endDateTime.getMinutes() + thirtyMinutes + thirtyMinutes);
    startDateTime.setMinutes(startDateTime.getMinutes() + thirtyMinutes);
    const meetingDetails = { ...mockProps, endDateTime, startDateTime };
    const wrapper = mount(
      <MeetingTimingBlock
        meetingDetails={meetingDetails}
        timeZone={timeZone}
        hideStartDate={true}
      />);
    expect(wrapper.find('p').last().text()).toEqual('Begins in 30 minutes');
  });

  describe('MeetingTimingBlock classes for editing', () => {
    const className = 'editable-session';
    it('it should find classes from array', () => {
      const wrapper = mount(
        <MeetingTimingBlock
          meetingDetails={mockProps}
          timeZone={timeZone}
          hideStartDate={true}
        />);
      expect(wrapper.find(`.${className}--table-row-left-date`)).toHaveLength(expectCount);
    });
  });
});
