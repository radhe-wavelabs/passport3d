import React from 'react';
import { utcToZonedTime } from 'date-fns-tz';
import { formatDistance, isSameDay } from 'date-fns';
import { getFormatTimezone, getFullDateInLocalFormat, getTimeInLocalFormat } from '../../lib/helpers/dateHelper';
import { TIME_RANGES } from '../../lib/constants';

interface IProps {
  meetingDetails: {
    startDateTime: string | Date,
    endDateTime: string | Date
  }
  timeZone: string,
  hideStartDate?: boolean,
  hideEndDateTime?: boolean,
  isMultiMeetingsBlock?: boolean
}

const MeetingTimingBlock: React.FC<IProps> = (props: IProps) => {
  const { startDateTime, endDateTime } = props.meetingDetails;
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const formattedHostStartDate = getFullDateInLocalFormat(startDateTime, props.timeZone);
  const formattedHostStartTime = getTimeInLocalFormat(startDateTime, props.timeZone);
  const formattedAttendeeStartTime = getTimeInLocalFormat(startDateTime, currentTimeZone);
  const attendeeStartDateTime = utcToZonedTime(startDateTime, currentTimeZone);
  const attendeeOffsetGMT = getFormatTimezone(attendeeStartDateTime);
  const formattedHostEndTime = getTimeInLocalFormat(endDateTime, props.timeZone);
  const formattedAttendeeEndTime = getTimeInLocalFormat(endDateTime, currentTimeZone);
  const attendeeEndDateTime = utcToZonedTime(endDateTime, currentTimeZone);
  const eventStartDateTime = new Date(startDateTime);
  const className = 'editable-session';
  const classNameSessionTableRowLeftDate = `${className}--table-row-left-date`;
  
  
  const getMeetingStatus = (): JSX.Element | null => {
    const newDate = new Date();

    if (attendeeEndDateTime < newDate) {
      return ( 
        <p className='text-red-600 italic font-size-11px pt-1'>
          {props.isMultiMeetingsBlock ? 'These meetings are in the past' : 'This meeting is in the past'}
        </p>);
    } 
    if (attendeeStartDateTime < newDate ){
      return (<p className='text-primary italic font-size-11px pt-1 font-bold'>In progress</p>);
    } 
    if ((attendeeStartDateTime.getTime() - newDate.getTime()) > TIME_RANGES.MILLISECONDS_IN_HOUR) {
      return null;
    } 
    return (
      <p className='text-primary italic font-size-11px pt-1'>
        Begins in {formatDistance(attendeeStartDateTime, newDate)}
      </p>);
  };

  const isEventTimezoneTimeDifferents = (): boolean => {
    return (getTimeInLocalFormat(attendeeStartDateTime, currentTimeZone) === getTimeInLocalFormat(eventStartDateTime, props.timeZone));
  };

  return (
    <>
      {props.hideStartDate ||
        <p className='text-primary font-size-14px font-bold uppercase tracking-widest'>
          {formattedHostStartDate}
        </p>}
      <p className={`${classNameSessionTableRowLeftDate} text-black font-size-15px font-bold pt-2 lowercase tracking-widest`}>
        {formattedHostStartTime}{props.hideEndDateTime || ` - ${formattedHostEndTime}`}
      </p>
      {!isSameDay(eventStartDateTime, utcToZonedTime(startDateTime, props.timeZone)) &&
        <div className='text-gray-500 font-size-10px pt-1'>
          {getFullDateInLocalFormat(eventStartDateTime, currentTimeZone)}
        </div>}
      {!isEventTimezoneTimeDifferents() && <p className='text-gray-500 font-size-10px pt-1'>
        <span className='lowercase'>
          {formattedAttendeeStartTime}{props.hideEndDateTime || ` - ${formattedAttendeeEndTime}`}
        </span>
        &nbsp;({attendeeOffsetGMT})
      </p>}
      {getMeetingStatus()}
    </>
  );
};

export default MeetingTimingBlock;
