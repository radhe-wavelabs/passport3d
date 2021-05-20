import React from 'react';
import { mount } from 'enzyme';
import EventDetails from '../../shared/EventDetails';
import * as eventApi from '../../../hooks/api/protected/use-event-private-details';
import WelcomeWrapper from '../WelcomeWrapper/WelcomeWrapper';
import WelcomeBlock from '../WelcomeWrapper/WelcomeBlock';
import { EventPrivateDetailsResponseType } from '../../../lib/api/protected';

const mockData: EventPrivateDetailsResponseType = {
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
  showcaseEnabled: true,
  welcomeKnovioEnabled: true,
  welcomeKnovioEmbedId: 1
};

const expectCount = 1;

describe('WelcomePage', () => {
  let useEventPrivateInfoMock: jest.SpyInstance;

  beforeEach(() => {
    useEventPrivateInfoMock = jest.spyOn(eventApi, 'useEventPrivateInfo');
    useEventPrivateInfoMock.mockImplementation(() => {return { data: mockData, isValidating: true };});
  });

  afterEach(() => {
    useEventPrivateInfoMock.mockRestore();
  });

  describe('WelcomePage initializing', () => {

    it('should render WelcomePage', () => {
      const wrapper = mount(<WelcomeWrapper/>);
      expect(wrapper.length).toBe(expectCount);
    });

    it('should render EventDetails', () => {
      const wrapper = mount(<WelcomeWrapper/>);
      expect(wrapper.find(EventDetails)).toHaveLength(expectCount);
    });

    it('should render WelcomeBlock', () => {
      const wrapper = mount(<WelcomeWrapper/>);
      expect(wrapper.find(WelcomeBlock)).toHaveLength(expectCount);
    });

    it('should have "editable" classNames', () => {
      const editableClassName = 'editable-welcome-';
      const classes = ['knovio', 'knovio--wrapper', '-wrapper', '-description', 'footer', 'footer--title', 'footer--wrapper', 'footer--description'];
      const wrapper = mount(<WelcomeWrapper />);

      classes.forEach( className => {
        expect(wrapper.find(`.${editableClassName + className}`)).toHaveLength(expectCount);
      });
    });
  });
});
