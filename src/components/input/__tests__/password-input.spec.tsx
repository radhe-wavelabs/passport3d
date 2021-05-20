import React from 'react';
import defaultMember from '../index';
import { shallow } from 'enzyme';
import { Input } from '../../_base/Input';

describe('common-button', () => {
  const mockProps = {
    id: 'test',
    name: 'name is required',
    label: 'test',
    value: 'test',
    type: 'password',
    error: 'test',
    onChange: jest.fn()
  };

  beforeEach(() => {
    jest.resetModules();
  });

  const mockElement = <input className={'test'}>Test</input>;

  test('should render Input component', () => {
    jest.doMock('../../_base/Input', () => {
      return mockElement;
    });
    const wrapper = shallow(<defaultMember.Password {...mockProps}/>);
    expect(wrapper.exists(Input)).toBe(true);
  });
});
