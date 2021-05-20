import React from 'react';
import defaultMember from '../index';
import { shallow } from 'enzyme';
import { Button } from '../../_base/Button';

describe('common-button', () => {
  const mockElement = <button className={'test'}>Test</button>;

  const mockProps = {
    label: 'Test',
    name: 'name is mandatory',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.resetModules();
  });

  test('should render Button component', () => {
    jest.doMock('../../_base/Button', () => {
      return mockElement;
    });
    const wrapper = shallow(<defaultMember.Common {...mockProps}/>);
    expect(wrapper.exists(Button)).toBe(true);
  });
});
