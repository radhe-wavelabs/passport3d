import React from 'react';
import { PrivateMeetingDetailsResponseType } from '../../../lib/api';
import MeetingDetails, { IProps } from '../MeetingDetails';
import { shallow, ShallowWrapper } from 'enzyme';
import MeetingTimingBlock from "../MeetingTimingBlock";

const timeZone = 'Atlantic/Azores';
const CONNECTION_DETAILS = 'connection details';
const MEETING_INVITATION = 'meeting Invitation';
const mockData: PrivateMeetingDetailsResponseType = {
  startDateTime: '2020-10-30T21:00:00Z',
  endDateTime: '2020-09-30T21:00:00Z',
  topic: 'topic',
  type: 'SCHEDULED',
  notes: '',
  access: 'CLOSED',
  track: '',
  meetingId: '1',
  connectionDetails: CONNECTION_DETAILS,
  connectionDefined: true,
  meetingInvitation: MEETING_INVITATION
};

describe('MeetingDetails', () => {

  const defaultProps = { meetingDetails: mockData, timeZone };
  const getWrapper = (props = defaultProps as IProps) => {
    return shallow(
      <MeetingDetails meetingDetails={mockData} timeZone={timeZone}>
        test
      </MeetingDetails>
    );
  };

  const getMeetingBlockRightSide = (wrapper: ShallowWrapper) => wrapper.find('.flex-equal').last();

  it('should render correct props', () => {
    const wrapper = shallow(<MeetingDetails meetingDetails={mockData} timeZone={timeZone}>test</MeetingDetails>);
    expect(wrapper.find(MeetingTimingBlock).prop('meetingDetails')).toMatchObject(mockData);
  });

  it('should render MeetingTimingBlock', () => {
    const wrapper = shallow(<MeetingDetails meetingDetails={mockData} timeZone={timeZone}>test</MeetingDetails>);
    const expectCount = 1;
    expect(wrapper.find(MeetingTimingBlock)).toHaveLength(expectCount);
  });

  it('should render meeting invitation if connections defined', () => {
    expect(getMeetingBlockRightSide(getWrapper()).html().includes(MEETING_INVITATION)).toBeTruthy();
  });
  it('should render connection details if connections is not defined', () => {
    mockData.connectionDefined = false;
    expect(getMeetingBlockRightSide(getWrapper()).html().includes(CONNECTION_DETAILS)).toBeTruthy();
  });
  it('should render default text if show details is not allowed', () => {
    const output = getMeetingBlockRightSide(shallow(
      <MeetingDetails meetingDetails={mockData} timeZone={timeZone} showDetailsAllowed={false}>test</MeetingDetails>)
    );
    expect(output.html().includes(MEETING_INVITATION)).toBeFalsy();
    expect(output.html().includes(CONNECTION_DETAILS)).toBeFalsy();
    expect(output.html().includes('Connection Details will be provided before this meeting begins.')).toBeTruthy();
  });

});
