import React from 'react';
import { mount } from 'enzyme';
import EventDetails from '../../shared/EventDetails';
import * as eventApi from '../../../hooks/api/protected/use-event-private-details';
import { EventPrivateDetailsResponseType } from "../../../lib/api/protected";
import SupportPageWrapper from "../SupportPageWrapper/SupportPageWrapper";
import SupportPageInfo from "../SupportPageWrapper/SupportPageInfo";
import { MemoryRouter } from 'react-router';

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
  showcaseEnabled: false,
  supportData: {
    supportInformation: 'supportInformation',
    supportLabel: 'supportLabel',
    supportEnabled: true,
  }
};

const expectCount = 1;

describe('SupportPageWrapper', () => {
  let useEventPrivateInfoMock: jest.SpyInstance;

  beforeEach(() => {
    useEventPrivateInfoMock = jest.spyOn(eventApi, 'useEventPrivateInfo');
    useEventPrivateInfoMock.mockImplementation(() => mockData);
  });

  afterEach(() => {
    useEventPrivateInfoMock.mockRestore();
  });

  describe('SupportPage initializing', () => {

    it('should render SupportPage', () => {
      const wrapper = mount(
        <MemoryRouter>
          <SupportPageWrapper/>
        </MemoryRouter>
      );
      expect(wrapper.length).toBe(expectCount);
    });

    it('should render EventDetails', () => {
      const wrapper = mount(
        <MemoryRouter>
          <SupportPageWrapper/>
        </MemoryRouter>
      );
      expect(wrapper.find(EventDetails));
    });

    it('should render SupportPageInfo', () => {
      const wrapper = mount(
        <MemoryRouter>
          <SupportPageWrapper/>
        </MemoryRouter>
      );
      expect(wrapper.find(SupportPageInfo));
    });
    it('should have "editable" classNames', () => {
      const classes = ['wrapper', 'description'];
      const wrapper = mount(
        <MemoryRouter>
          <SupportPageWrapper/>
        </MemoryRouter>
      );

      classes.forEach( className => {
        expect(wrapper.find(`.editable-support--${className}`));
      });
    });
  });
});
