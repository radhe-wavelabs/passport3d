import React from 'react';
import { mount } from 'enzyme';
import HeaderNavBar from '../HeaderNavBar';
import * as eventApi from '../../../hooks/api/protected/use-event-private-details';

jest.mock('../../../lib/context-providers/media-query-provider', () => ({
  useMediaQuery() {
    return {
      isDesktop: true
    };
  }
}));


const expectCount = 1;
const mockData = {
  endTime: '2020-09-30T21:00:00Z',
  startTime: '2020-10-30T21:00:00Z',
  name: 'Test',
  eventId: 5,
  timeZone: 'Atlantic/Azores',
  subdomain: 'test',
  publicDescription: 'test',
  privateDescription: 'privateDescription',
  logoUrl: 'logoUrl',
  logoTitle: 'logoTitle'
};

describe('HeaderNavBar', () => {
  let useEventPrivateInfoMock: jest.SpyInstance;

  beforeEach(() => {
    useEventPrivateInfoMock = jest.spyOn(eventApi, 'useEventPrivateInfo');
    useEventPrivateInfoMock.mockImplementation(() => mockData);
  });

  afterEach(() => {
    useEventPrivateInfoMock.mockRestore();
  });

  describe('HeaderNavBar initializing', () => {

    it('should render WelcomePage', () => {
      const wrapper = mount(<HeaderNavBar/>);
      expect(wrapper.length).toBe(expectCount);
    });
  });
});
