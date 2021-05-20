import React from 'react';
import DateRange, { DateRangeProps } from '../DateRange';
import { shallow } from 'enzyme';
import * as dateHelper from '../../../lib/helpers/dateHelper';
import { getFullDateInLocalFormat } from '../../../lib/helpers/dateHelper';

describe('', ()=> {
  let getCurrentTimezoneMock:jest.SpyInstance;

  const timeZone = 'America/Godthab';
  const mockProps: DateRangeProps = {
    startTime: '2020-09-27T02:00:00Z',
    endTime: '2020-10-31T03:00:00Z',
    timeZone
  };

  const formattedStartTime = getFullDateInLocalFormat(mockProps.startTime, timeZone);
  const formattedEndTime = getFullDateInLocalFormat(mockProps.endTime, timeZone);
  const mockResult = `${formattedStartTime}  - ${formattedEndTime}`;

  beforeEach(() => {
    getCurrentTimezoneMock = jest.spyOn(dateHelper, 'getCurrentTimezone');
    getCurrentTimezoneMock.mockImplementation(() => 'America/Godthab');
  });

  afterEach(() => {
    getCurrentTimezoneMock.mockRestore();
  });

  it('should render with correct props', () => {
    const wrapper = shallow(<DateRange {...mockProps}/>);
    expect(wrapper.text()).toEqual(mockResult);
  });

  it('should render only start date if start date equal to end date', () =>{
    const wrapper = shallow(<DateRange startTime={mockProps.startTime} endTime={mockProps.startTime} timeZone={mockProps.timeZone}/>);
    expect(wrapper.text()).toEqual(formattedStartTime);
  });
});
