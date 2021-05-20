import React from 'react';
import { mount } from 'enzyme';
import useConnectToPublicMeetingMethod from '../../../hooks/use-connect-to-public-meeting-method';
import JoinButton, { JoinButtonProps } from '../JoinButton';
import * as meetingIdApi from '../../../hooks/use-meeting-id';
import * as eventIdApi from '../../../hooks/use-event-id';

const expectCount = 1;

describe('JoinButton', () => {
  let useMeetingIdMock: jest.SpyInstance;
  let useEventIdMock: jest.SpyInstance;

  beforeEach(() => {
    useMeetingIdMock = jest.spyOn(meetingIdApi, 'useMeetingId');
    useMeetingIdMock.mockImplementation(() => '1');
    useEventIdMock = jest.spyOn(eventIdApi, 'useEventId');
    useEventIdMock.mockImplementation(() => '1');
  });

  describe('JoinButton initializing', () => {
    const props = {
      isDisabled: false,
      meetingDetails: { attendeeLink: 'external link' },
      useConnectToMeetingMethod: jest.fn() as typeof useConnectToPublicMeetingMethod
    } as JoinButtonProps;
    it('should render JoinButton', () => {
      const wrapper = mount(<JoinButton {...props} />);
      expect(wrapper.length).toBe(expectCount);
    });

    it('connect button should be enabled', () => {
      props.isDisabled = true;
      const wrapper = mount(<JoinButton {...props} />);
      expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    });
  });
});
