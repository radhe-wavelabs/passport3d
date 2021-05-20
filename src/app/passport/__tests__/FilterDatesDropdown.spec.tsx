import React from 'react';
import { mount } from 'enzyme';
import FilterDatesDropdown from '../SessionWrapper/FilterDatesDropdown';

const mockData = {
  onChangeSelection: jest.fn,
  dateOptions: ['1', '2', '3'],
  selectedDate: '1'
};

const expectCount = 1;

describe('FilterDatesDropdown', () => {
  describe('FilterDatesDropdown initializing', () => {
    it('should render FilterDatesDropdown', () => {
      const wrapper = mount(<FilterDatesDropdown {...mockData}/>);
      expect(wrapper.length).toBe(expectCount);
    });
  });
});
