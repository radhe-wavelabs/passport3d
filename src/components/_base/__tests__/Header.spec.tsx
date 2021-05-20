import React from 'react';
import Header from '../Header';
import { OE_LOGO, OE_LOGO_ALT_TEXT } from '../../../lib/constants';
import { shallow } from 'enzyme';

describe('Footer', () => {
  const mockElement = <div className={'test'}>Test</div>;

  test('should render logo', () => {
    const wrapper = shallow(<Header/>);
    expect(wrapper.contains(<img src={OE_LOGO} alt={OE_LOGO_ALT_TEXT} />)).toBe(true);
  });

  test('should inject correct children', () => {
    const wrapper = shallow(<Header>{mockElement}</Header>);
    expect(wrapper.containsMatchingElement(mockElement)).toBe(true);
  });
});
