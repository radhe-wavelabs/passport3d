import React from 'react';
import { mount } from 'enzyme';
import TogglePastSessionsBtn from '../SessionWrapper/TogglePastSessionsBtn';

const mockData = {
  showToggleBtn: true,
  changeShowPastFlag: jest.fn,
  showPastMeetings: true
};

const expectCount = 1;

describe('TogglePastSessionsBtn', () => {
  describe('TogglePastSessionsBtn initializing', () => {
    it('should render TogglePastSessionsBtn', () => {
      const wrapper = mount(<TogglePastSessionsBtn {...mockData}/>);
      expect(wrapper.length).toBe(expectCount);
    });
  });
});
