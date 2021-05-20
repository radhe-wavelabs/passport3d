import React from 'react';
import { mount } from 'enzyme';
import RegisterBlock from '../LoginWrapper/RegisterBlock/RegisterBlock';
import * as eventApi from '../../../hooks/api/public/use-event-public-details';

const mockData = {
  registrationEnabled: true
};

const expectCount = 1;
let useEventPublicInfoMock: jest.SpyInstance;

describe('RegisterBlock', () => {
  beforeEach(() => {
    useEventPublicInfoMock = jest.spyOn(eventApi, 'useEventPublicInfo');
    useEventPublicInfoMock.mockImplementation(() => mockData);
  });

  afterEach(() => {
    useEventPublicInfoMock.mockRestore();
  });

  it('should render RegisterBlock', () => {
    const wrapper = mount(<RegisterBlock/>);
    expect(wrapper.length).toBe(expectCount);
  });
});
