import React, { useState } from 'react';
import { useEventPrivateMeetingsList } from '../../../hooks/api/protected/use-event-private-meeting-list';
import { EventPrivateDetailsResponseType, MeetingDetailsListResponseType } from '../../../lib/api';
import MeetingBlock from './MeetingBlock';
import { getFullDateInLocalFormat } from '../../../lib/helpers/dateHelper';
import { Button } from '../../../components/_base/Button';
import { useHistory } from 'react-router';
import { SESSION_PATH } from '../../../config/routes/paths';
import './AgendaDetails.scss';

interface IProps {
  event: EventPrivateDetailsResponseType
}

const AgendaDetails: React.FC<IProps> = (props: IProps): JSX.Element => {
  const { data, isValidating } = useEventPrivateMeetingsList(String(props.event.eventId)) as {data: MeetingDetailsListResponseType | void, isValidating: boolean};
  const [showPastMeetings, changeShowPastFlag] = useState(false);
  const history = useHistory();
  const className = 'editable-agenda';
  const classNameAgendaWrapper = `${className}--wrapper`;
  const classNameAgendaUpcomingMeeting = `${className}--upcoming-meeting`;
  const classNameAgendaFooter = `${className}--footer`;

  const renderMeetingList = () => {
    let currentDate = '';
    if (!data || isValidating) {
      return;
    }

    const filteredData = !data.futureMeetings.length
      ? data.pastMeetings
      : showPastMeetings
        ? [...data.pastMeetings, ...data.futureMeetings]
        : data.futureMeetings;


    return filteredData.map((meeting, key) => {
      const meetingBlock = <MeetingBlock meeting={meeting} key={meeting.meetingId} timeZone={props.event.timeZone} eventId={`${props.event.eventId}`}/>;
      const formattedStartDate = getFullDateInLocalFormat(meeting.startDateTime, props.event.timeZone);
      
      if (currentDate !== formattedStartDate) {
        currentDate = formattedStartDate;
        return (<div key={key} className={classNameAgendaUpcomingMeeting}>
          <p className='text-primary font-size-14px font-bold uppercase tracking-widest px-5 pt-8 pb-3'>
            {formattedStartDate}
          </p>
          {meetingBlock}
        </div>);
      } else {
        return meetingBlock;
      }
    });
  };

  const toggleElementContent = showPastMeetings
    ? <><i className='px-1 inline-block not-italic transform -rotate-90'>&#10095;</i> Hide past meetings</>
    : <><i className='px-3 inline-block not-italic transform rotate-90'>&#10095;</i> Show past meetings</>;

  const getToggleElement = () => {
    if (!data || !data.pastMeetings.length || !data.futureMeetings.length) return;
    return (
      <span
        className='text-sm text-primary self-center cursor-pointer text-right md:whitespace-no-wrap'
        onClick={() => changeShowPastFlag(!showPastMeetings)}
      >
        {toggleElementContent}
      </span>
    );
  };

  const isNoMeetings = (): boolean => {
    return isValidating || !data || (!data.futureMeetings?.length && !data.pastMeetings?.length);
  };

  const getEmptyListMessageBLock = (): JSX.Element => {
    return (
      <>
        <div className='font-size-14px italic px-4 py-10'>
          No meetings have been added to {props.event.agendaLabel} yet.
        </div>
        <hr/>
      </>
    );
  };

  const getGeneralSessionFooterBlock = (): JSX.Element | undefined => {
    if (props.event.sessionEnabled){
      return (
        <>
          <div className={classNameAgendaFooter + ' mt-12 px-4 flex flex-col md:flex-row items-center ' + (!props.event.sessionLinkDescription ? 'justify-center' : 'justify-between')}>
            <Button
              name='sessionMeetings'
              type='button'
              onClick={() => {history.push(SESSION_PATH);}}
              label={<span className='truncate m-auto max-w-full'>{'View ' + props.event.sessionLabel}</span>}
              data-tooltip={'View ' + props.event.sessionLabel}
              data-tooltip-position='bottom'
              className='agenda-footer-btn px-5 py-3 rounded text-center bg-white border font-medium border-gray-400 text-primary'
            />
            {props.event.sessionLinkDescription && <p className='md:ml-10 flex w-full text-left float-none self-center font-size-14px md:pt-0 pt-3'>
              {props.event.sessionLinkDescription}
            </p>}
          </div>
        </>
      );
    }
  };

  return (
    <div className={`${classNameAgendaWrapper} shadow-gray bg-white mx-auto md:w-3/4 md:px-8 py-8 mt-12 max-h-full h-70 w-100 mx-0 px-0`}>
      <h1 className='font-size-40px pb-8 px-4 flex justify-between'>
        {props.event.agendaLabel || 'My Schedule'}
        {getToggleElement()}
      </h1>
      <hr/>
      {isValidating || <>
        {isNoMeetings() && getEmptyListMessageBLock()}
        {renderMeetingList()}
      </>
      }
      {getGeneralSessionFooterBlock()}
    </div>
  );
};

export default AgendaDetails;
