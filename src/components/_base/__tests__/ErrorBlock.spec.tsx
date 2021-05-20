import React from 'react';
import { mount } from "enzyme";
import ErrorBlock from "../ErrorBlock";

describe('ErrorBlock', () => {
  const mockErrorMessage = 'Test';

  it('should render correct error message', () => {
    const wrapper = mount(<ErrorBlock errorMessage={mockErrorMessage}/>);
    const elementText = wrapper.children().text();
    expect(elementText).toMatch(mockErrorMessage);
  });
});

