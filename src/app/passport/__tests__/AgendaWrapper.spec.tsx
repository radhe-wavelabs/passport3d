import React from 'react';
import { mount } from 'enzyme';
import AgendaWrapper from '../AgendaWrapper/AgendaWrapper';
import EventDetails from '../../shared/EventDetails';
import AgendaDetails from '../AgendaWrapper/AgendaDetails';
import * as eventApi from '../../../hooks/api/public/use-event-public-details';

const mockData = {
  endTime: '2020-09-30T21:00:00Z',
  startTime: '2020-10-30T21:00:00Z',
  name: 'Test',
  eventId: 5,
  timeZone: 'Atlantic/Azores',
  subdomain: 'test',
  publicDescription: 'test'
};

const expectCount = 1;

describe('AgendaWrapper', () => {
  let useEventPublicInfoMock: jest.SpyInstance;

  beforeEach(() => {
    useEventPublicInfoMock = jest.spyOn(eventApi, 'useEventPublicInfo');
    useEventPublicInfoMock.mockImplementation(() => mockData);
  });

  afterEach(() => {
    useEventPublicInfoMock.mockRestore();
  });

  describe('AgendaWrapper initializing', () => {

    it('should render AgendaWrapper', () => {
      const wrapper = mount(<AgendaWrapper/>);
      expect(wrapper.length).toBe(expectCount);
    });

    it('should render EventDetails', () => {
      const wrapper = mount(<AgendaWrapper/>);
      expect(wrapper.find(EventDetails));
    });

    it('should render AgendaDetails', () => {
      const wrapper = mount(<AgendaWrapper/>);
      expect(wrapper.find(AgendaDetails));
    });
  });
});
