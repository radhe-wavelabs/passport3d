import React from 'react';
import EventDetails from '../EventDetails';
import { shallow, mount } from 'enzyme';
import * as dateHelper from '../../../lib/helpers/dateHelper';
import DateRange from '../../../components/_base/DateRange';
import useSetKeyIdClass from '../../../hooks/use-set-key-id-class';

const mockProps = {
  endTime: '2020-09-30T21:00:00Z',
  startTime: '2020-10-30T21:00:00Z',
  name: 'Test',
  eventId: 5,
  timeZone: 'Atlantic/Azores',
  subdomain: 'test',
  publicDescription: 'test',
  logoUrl: 'someUrl',
  logoTitle: 'title'
};

const correctTimeZone = 'GMT 0:00';

const elemIndex = {
  eventName: 1,
  eventTimeRange: 1,
  eventTimeZone: 1
};

describe('EventDetails', () => {
  let getFormattedTimezoneOffset: jest.SpyInstance;
  const expectCount = 1;

  beforeEach(() => {
    getFormattedTimezoneOffset = jest.spyOn(dateHelper, 'getFormatTimezone');
    getFormattedTimezoneOffset.mockImplementation(() => 'GMT 0:00');
  });

  afterEach(() => {
    getFormattedTimezoneOffset.mockRestore();
  });

  it('should render correct props', () => {
    const wrapper = mount(<EventDetails details={mockProps} />);
    expect(wrapper.prop('details')).toMatchObject(mockProps);
  });

  it('should render correct event name', () => {
    const wrapper = mount(<EventDetails details={mockProps} />);
    const elementText = wrapper.children().children().childAt(elemIndex.eventName).text();
    expect(elementText).toMatch(mockProps.name);
  });

  it('should render DateRange component', () => {
    const expectCount = 1;
    const wrapper = mount(<EventDetails details={mockProps} />);
    expect(wrapper.find(DateRange)).toHaveLength(expectCount);
  });

  it('should render correct time zone', () => {
    const wrapper = mount(
      <EventDetails details={mockProps} />);
    expect(getFormattedTimezoneOffset).toBeCalled();
    const elementText = wrapper.children().children().childAt(elemIndex.eventTimeZone).text();
    expect(elementText).toMatch(correctTimeZone);
  });

  it('should have "editable" classNames', () => {
    const path = useSetKeyIdClass();
    const editableClassName = `editable-${path}-event-details--`;
    const classes = ['name', 'date', 'image', 'wrapper', 'time-zone'];
    const wrapper = shallow(<EventDetails details={mockProps} />);

    classes.forEach( className => {
      expect(wrapper.find(`.${editableClassName + className}`)).toHaveLength(expectCount);
    });
  });
  
});
