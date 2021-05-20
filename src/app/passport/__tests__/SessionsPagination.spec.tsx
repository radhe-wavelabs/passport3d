import React from 'react';
import { mount } from 'enzyme';
import SessionsPagination from '../SessionWrapper/SessionsPagination';

const mockData = {
  trackLength: 3,
  setPaginationConfig: jest.fn,
  firstIndex: 0,
  lastIndex: 3,
  step: 2,
  pageContentBlock: null
};

const expectCount = 1;

describe('SessionsPagination', () => {
  describe('SessionsPagination initializing', () => {
    it('should render SessionsPagination', () => {
      const wrapper = mount(<SessionsPagination {...mockData}/>);
      expect(wrapper.length).toBe(expectCount);
    });
  });
});
