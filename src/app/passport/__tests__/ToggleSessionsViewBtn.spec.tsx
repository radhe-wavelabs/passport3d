import React from 'react';
import { mount } from 'enzyme';
import ToggleSessionsViewBtn from '../SessionWrapper/ToggleSessionsViewBtn';
import { ReactComponent as CollapseIcon } from '../../../styles/icons/collapse-view.svg';
import { ReactComponent as ExpandIcon } from '../../../styles/icons/expand-view.svg';

const mockData = {
  isExpandedView: true,
  setExpandedView: jest.fn
};

const expectCount = 1;

describe('ToggleSessionsViewBtn', () => {
  describe('ToggleSessionsViewBtn initializing', () => {
    it('should render ToggleSessionsViewBtn', () => {
      const wrapper = mount(<ToggleSessionsViewBtn {...mockData}/>);
      expect(wrapper.length).toBe(expectCount);
    });
    it('should render ExpandIcon and CollapseIcon', () => {
      const wrapper = mount(<ToggleSessionsViewBtn {...mockData}/>);
      expect(wrapper.find(ExpandIcon)).toHaveLength(expectCount);
      expect(wrapper.find(CollapseIcon)).toHaveLength(expectCount);
    });
  });

  describe('ToggleSessionsViewBtn classes for editing', () => {
    const className = 'editable-session';
    it('it should find classes from array', () => {
      const wrapper = mount(<ToggleSessionsViewBtn {...mockData}/>);
      const classes = [
        `${className}--header-buttons`,
        `${className}--header-left-btn`,
        `${className}--header-right-btn`,
      ];
      classes.forEach(className => {
        expect(wrapper.find('.'+className)).toHaveLength(expectCount);
      });
    });
  });
});
