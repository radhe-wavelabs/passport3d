import React from 'react';
import { usePrivateSessionMeetingsList } from '../../../hooks/api/protected/use-private-session-meeting-list';
import { EventPrivateDetailsResponseType, PrivateMeetingSessionDetailsResponseType } from '../../../lib/api';
import GroupedList, { IGroupedMeetingsList, PrivateMeetingSessionList } from './GroupedList';
import { getShortDateWithYearInLocalFormat } from '../../../lib/helpers/dateHelper';

interface IProps {
  event: EventPrivateDetailsResponseType
}

const SessionMeetingsList: React.FC<IProps> = (props: IProps) => {
  const { data } = usePrivateSessionMeetingsList(String(props.event.eventId)) as {data?: PrivateMeetingSessionList};
  const className = 'editable-session';
  const classNameSessionWrapper = `${className}--wrapper`;

  if (!data) return null;

  const getGroupedMeetingsList = (meetings: PrivateMeetingSessionList): IGroupedMeetingsList => {
    const groupedMeetingsList: IGroupedMeetingsList = {};
    meetings.forEach((meeting: PrivateMeetingSessionDetailsResponseType) => {
      const startDate = getShortDateWithYearInLocalFormat(meeting.startDateTime, props.event.timeZone);
      if (groupedMeetingsList[startDate]) {
        groupedMeetingsList[startDate].push(meeting);
      } else {
        groupedMeetingsList[startDate] = [meeting];
      }
    });
    return groupedMeetingsList;
  };

  return (
    <div className={`${classNameSessionWrapper} shadow-gray bg-white mx-auto md:w-3/4 md:px-8 py-8 mt-12 max-h-full h-70 w-100 mx-0 px-0`}>
      {(data && !!data.length)
        ? <GroupedList meetings={getGroupedMeetingsList(data)} event={props.event}/>
        : <>
          <div className='font-size-40px pt-2 md:pb-8 pl-4 md:flex justify-between items-end leading-none'>
            {props.event.sessionLabel ?? 'General session'}
          </div>
          <hr/>
        </>}
    </div>
  );
};

export default SessionMeetingsList;
