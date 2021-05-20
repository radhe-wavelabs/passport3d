import React from 'react';
import Footer from '../Footer';
import { shallow } from 'enzyme';

describe('Footer', () => {
  const mockElement = <div className={'test'}>Test</div>;

  beforeEach(() => {
    jest.resetModules();
  });

  test('should render children component if provided', () => {
    const wrapper = shallow(<Footer children={<span>test</span>}/>);
    expect(wrapper.exists(`span`)).toBe(false);
  });

  test('should inject correct children', () => {
    const wrapper = shallow(<Footer>{mockElement}</Footer>);
    expect(wrapper.containsMatchingElement(mockElement)).toBe(false);
  });
});
