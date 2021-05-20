import React from 'react';
import { Button, ButtonProps } from '../Button';
import { shallow } from 'enzyme';

describe('Button', () => {
  const mockElement = <div className={'test'}>Test</div>;
  const onClickMoc = jest.fn();
  const mockProps: ButtonProps = {
    label: 'Test',
    type: 'button',
    onClick: onClickMoc
  };
  test('should render with correct props', () => {
    const wrapper = shallow(<Button {...mockProps}/>);
    wrapper.simulate('click');
    expect(wrapper.text()).toEqual(mockProps.label);
    expect(wrapper.type()).toEqual('button');
    expect(onClickMoc).toHaveBeenCalled();
  });
  test('should set up disabled state', () => {
    const wrapper = shallow(<Button {...mockProps} disabled/>);
    expect(wrapper.prop('disabled')).toEqual(true);
  });
  test('should inject correct children', () => {
    const wrapper = shallow(<Button {...mockProps}>{mockElement}</Button>);
    expect(wrapper.containsMatchingElement(mockElement)).toBe(true);
  });
});
