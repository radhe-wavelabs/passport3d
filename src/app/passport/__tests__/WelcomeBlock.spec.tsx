import React from 'react';
import { mount } from 'enzyme';
import * as eventApi from '../../../hooks/api/protected/use-event-private-details';
import { IEventPrivateDetails } from '../../../hooks/api/protected/use-event-private-details';
import WelcomeBlock from '../WelcomeWrapper/WelcomeBlock';
import KnovioThumbnail from '../WelcomeWrapper/KnovioThumbnail';

const mockData: IEventPrivateDetails = {
  endTime: '2020-09-30T21:00:00Z',
  startTime: '2020-10-30T21:00:00Z',
  name: 'Test',
  eventId: 5,
  timeZone: 'Atlantic/Azores',
  subdomain: 'test',
  publicDescription: 'test',
  privateDescription: 'privateDescription',
  logoUrl: 'logoUrl',
  logoTitle: 'logoTitle',
  welcomeKnovioEnabled: false,
  welcomeKnovioEmbedId: '111222333'
};

const expectCount = 1;
const expectNoneCount = 0;

describe('WelcomeBlock', () => {
  let useEventPrivateInfoMock: jest.SpyInstance;

  beforeEach(() => {
    useEventPrivateInfoMock = jest.spyOn(eventApi, 'useEventPrivateInfo');
    useEventPrivateInfoMock.mockImplementation(() => mockData);
  });

  afterEach(() => {
    useEventPrivateInfoMock.mockRestore();
  });

  describe('WelcomeBlock initializing', () => {
    it('should render WelcomeBlock', () => {
      const wrapper = mount(<WelcomeBlock {...mockData}/>);
      expect(wrapper.find(WelcomeBlock)).toHaveLength(expectCount);
    });
    it('should render KnovioThumbnail', () => {
      const props = { ...mockData, welcomeKnovioEnabled: true };
      const wrapper = mount(<WelcomeBlock {...props}/>);
      expect(wrapper.find(KnovioThumbnail)).toHaveLength(expectCount);
    });
    it('should not render KnovioThumbnail', () => {
      const props = { ...mockData, welcomeKnovioEnabled: false };
      const wrapper = mount(<WelcomeBlock {...props} />);
      expect(wrapper.find(KnovioThumbnail)).toHaveLength(expectNoneCount);
    });
  });
});
