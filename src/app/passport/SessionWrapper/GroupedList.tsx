import React, { useState, useRef, RefObject, useMemo, useEffect } from 'react';
import { EventPrivateDetailsResponseType } from '../../../lib/api';
import { PrivateMeetingSessionDetailsListResponseType } from '../../../lib/api';
import MeetingTimingBlock from '../../shared/MeetingTimingBlock';
import { ARRAY_INCREMENT_SIZE, COMPARE_INDEX } from '../../../lib/constants';
import SessionsPagination, { IPagination } from './SessionsPagination';
import TogglePastSessionsBtn from './TogglePastSessionsBtn';
import SessionMeetingsTile from './SessionMeetingsTile';
import ToggleSessionsViewBtn from './ToggleSessionsViewBtn';
import FilterDatesDropdown from './FilterDatesDropdown';

export type PrivateMeetingSessionList = PrivateMeetingSessionDetailsListResponseType;

export interface IGroupedMeetingsList {
  [date: string]: PrivateMeetingSessionList
}

interface IProps {
  meetings: IGroupedMeetingsList,
  event: EventPrivateDetailsResponseType
}

interface IMeetingsByStartTime {
  meetingsList: PrivateMeetingSessionList,
  startTime: string,
  endDateTime: Date,
}

const getActiveTracks = (activeMeetings: PrivateMeetingSessionList): string[] => {
  // returns unique sorted tracks list
  return [...new Set(activeMeetings.map(m => m.track))]
    .sort((t1, t2) => !t1 ? COMPARE_INDEX : !t2 ? -COMPARE_INDEX : t1.localeCompare(t2));
};

const GroupedList: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { meetings, event } = props;
  const [pagination, setPaginationConfig] = useState<IPagination>({ firstIndex: 0, lastIndex: 3, step: 0 });
  const [showPastMeetings, changeShowPastFlag] = useState<boolean> (false);
  const [isTogglePastMeetingsBtnShown, setIsTogglePastMeetingsBtnShown] = useState<boolean>(false);
  const pageContent: RefObject<HTMLDivElement> | null = useRef<HTMLDivElement>(null);

  const className = 'editable-session';
  const classNameSessionHeader = `${className}--header`;
  const classNameSessionHeaderRight = `${className}--header-right`;
  const classNameSessionTableHeader = `${className}--table-header`;
  const classNameSessionTableHeaderLeft = `${className}--table-header-left`;
  const classNameSessionTableHeaderRight = `${className}--table-header-right`;
  const classNameSessionTableRow = `${className}--table-row`;
  const classNameSessionTableRowLeft = `${className}--table-row-left`;
  const classNameSessionTableRowRight = `${className}--table-row-right`;
  const classNameSessionTableRowRightTile = `${className}--table-row-right-tile`;

  const getDefaultSelectedDate = (): string => {
    const nowDateInMs = new Date().getTime();
    const days = Object.keys(meetings);
    let defaultSelectedDate = days[0];
    let selectedDateAlreadySet = false;
    days.forEach((k: string) => {
      const meetingsByDate = meetings[k];
      const endDateInMs = new Date(meetingsByDate[meetingsByDate.length - ARRAY_INCREMENT_SIZE].endDateTime).getTime();
      if (endDateInMs > nowDateInMs && !selectedDateAlreadySet) {
        defaultSelectedDate = k;
        selectedDateAlreadySet = true;
      }
    });
    return defaultSelectedDate;
  };
  const [selectedDate, setMeetingsDate] = useState<string>(getDefaultSelectedDate());

  const meetingsByStartTime = useMemo((): IMeetingsByStartTime[] => {
    const meetingsBySelectedDate = meetings[selectedDate];
    const startDateTimes = [...new Set(meetingsBySelectedDate.map(m => m.startDateTime))];
    return startDateTimes.map((startDateTime: string) => {
      const meetingsByStartTime = meetingsBySelectedDate.filter(m => m.startDateTime === startDateTime);
      const endDateTime = meetingsByStartTime.map(m => new Date(m.endDateTime)).reduce((ed, d) => ed < d ? d : ed);
      return {
        meetingsList: meetingsByStartTime,
        startTime: startDateTime,
        endDateTime
      };
    });
  }, [meetings, selectedDate]);

  const activeMeetings = useMemo((): PrivateMeetingSessionList => {
    const nowDateInMs = new Date().getTime();
    let activeMeetings: PrivateMeetingSessionList = [];
    meetingsByStartTime.forEach(ms => {
      const endDateInMs = ms.endDateTime.getTime();
      activeMeetings = (!showPastMeetings && (endDateInMs < nowDateInMs)) ? activeMeetings : activeMeetings.concat(ms.meetingsList);
    });
    return activeMeetings;
  }, [meetingsByStartTime, showPastMeetings]);

  const tracksLength = getActiveTracks(activeMeetings).length;
  const maxElementsToCollapsedView = 2;
  const [isExpandedView, setExpandedView] = useState<boolean>(tracksLength <= maxElementsToCollapsedView);

  useEffect(()=> {
    const nowDateInMs = new Date().getTime();
    const endedMeetings = meetingsByStartTime.filter(m => m.endDateTime.getTime() > nowDateInMs);
    const isBtnShown = endedMeetings.length > 0 && endedMeetings.length !== meetingsByStartTime.length;
    setIsTogglePastMeetingsBtnShown(isBtnShown);
    changeShowPastFlag(!isBtnShown);
  }, [meetingsByStartTime]);

  const getTileWidth = (): number => {
    const expandedWidth = 300;
    const collapsedWidth = 140;
    return isExpandedView ? expandedWidth : collapsedWidth;
  };
  const getTracksClassName = (): string => {
    return 'w-' + getTileWidth() + 'px font-size-15px font-semibold pl-2 mx-2 truncate max-w-40vw';
  };
  const GroupedMeetingsList = (): JSX.Element => {
    const nowDateInMs = new Date().getTime();
    return (<>
      {meetingsByStartTime.filter((ms) => showPastMeetings || (ms.endDateTime.getTime() > nowDateInMs))
        .map((ms, i) => {
          return (
            <div key={i} className={classNameSessionTableRow}>
              <div className='flex p-2 bg-primary-lighter-hover min-h-168px'>
                <div className={`${classNameSessionTableRowLeft} pr-5 pl-3 timing-column`}>
                  <MeetingTimingBlock
                    meetingDetails={{ startDateTime: ms.startTime, endDateTime: ms.endDateTime }}
                    timeZone={event.timeZone}
                    hideStartDate={true}
                    hideEndDateTime={true}
                    isMultiMeetingsBlock={meetingsByStartTime[i].meetingsList.length > ARRAY_INCREMENT_SIZE}
                  >
                  </MeetingTimingBlock>
                </div>
                <div className={`${classNameSessionTableRowRight} w-full flex`}>
                  {getActiveTracks(activeMeetings).map((t, k) => {
                    if (k < pagination.firstIndex || k > pagination.lastIndex) return null;
                    return (
                      <div className={classNameSessionTableRowRightTile + ' w-' + getTileWidth() + 'px mx-2 mt-2 max-w-40vw flex flex-col'} key={k}>
                        {activeMeetings.filter(m => m.startDateTime === ms.startTime && m.track === t)
                          .map((m, k) => <SessionMeetingsTile key={k} meeting={m} event={event} isExpandedView={isExpandedView} changeJoinStatus={(newJoinStatus) => m.joinStatus = newJoinStatus}/>)}
                      </div>);
                  })}
                </div>
                <div className='w-50px'>{/* place for meetings pagination controllers */}</div>
              </div>
              <hr/>
            </div>);
        })}
    </>);
  };

  return (
    <>
      <div className={`${classNameSessionHeader} font-size-40px pt-2 md:pb-8 pl-4 lg:flex justify-between items-end leading-none`}>
        {event?.sessionLabel ?? 'General session'}
        <div className={classNameSessionHeaderRight + ' flex justify-end md:float-none py-4 md:pt-0 whitespace-no-wrap'}>
          {isTogglePastMeetingsBtnShown && <TogglePastSessionsBtn changeShowPastFlag={changeShowPastFlag} showPastMeetings={showPastMeetings}/>}
          <ToggleSessionsViewBtn setExpandedView={setExpandedView} isExpandedView={isExpandedView}/>
        </div>
      </div>
      <hr/>
      <div className={`${classNameSessionTableHeader} bg-gray-11 border-b flex`} ref={pageContent}>
        <div className={`${classNameSessionTableHeaderLeft} p-2 timing-column`}>
          <FilterDatesDropdown
            selectedDate={selectedDate}
            dateOptions={Object.keys(meetings)}
            onChangeSelection={setMeetingsDate}
            eventTimeZone={event.timeZone}
          />
        </div>
        <div className={`${classNameSessionTableHeaderRight} w-full flex flex-row py-2`}>
          {getActiveTracks(activeMeetings).slice(pagination.firstIndex, pagination.lastIndex + ARRAY_INCREMENT_SIZE)
            .map((t, k) => <span className={getTracksClassName()} key={k}>{t}</span>)}
        </div>
        <SessionsPagination
          itemWidth={getTileWidth()}
          trackLength={getActiveTracks(activeMeetings).length}
          setPaginationConfig={setPaginationConfig}
          {...pagination}
          pageContentBlock={pageContent.current || null}
        />
      </div>
      <GroupedMeetingsList />
    </>
  );
};

export default GroupedList;
