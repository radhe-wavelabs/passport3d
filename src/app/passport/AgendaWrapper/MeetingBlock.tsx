import React from 'react';
import { useHistory } from 'react-router-dom';
import MeetingTimingBlock from '../../shared/MeetingTimingBlock';
import { EventPrivateDetailsResponseType, PrivateMeetingDetailsResponseType } from '../../../lib/api';
import { Button } from '../../../components/_base/Button';
import OrganizationsList from '../../shared/OrganizationsList';
import useConnectMeetingDisabled from '../../../hooks/use-connect-meeting-disabled';
import { useEventPrivateInfo } from '../../../hooks/api/protected/use-event-private-details';

interface IProps {
  meeting: PrivateMeetingDetailsResponseType,
  eventId: string,
  timeZone: string
}

const MeetingBlock: React.FC<IProps> = (props: IProps): JSX.Element => {
  const {
    notes,
    topic,
    access,
    meetingId,
    startDateTime,
    presenterOrganizations,
    participantOrganizations
  } = props.meeting;

  const { data } = useEventPrivateInfo() as { data?: EventPrivateDetailsResponseType };
  const isConnectBtnDisabled = useConnectMeetingDisabled(data, startDateTime);
  const history = useHistory();
  const className = 'editable-agenda';
  const classNameAgendaBlock = `${className}--block`;
  const classNameAgendaBlockDate = `${className}--block-date`;
  const classNameAgendaBlockAttendees = `${className}--block-attendees`;
  const classNameAgendaBlockButton = `${className}--block-button`;

  interface MeetingTopicProps {
    className?: string;
  }

  const MeetingTopic = ({ className = '' }: MeetingTopicProps) => {
    return (
      <div className={`break-words ${className}`}>
        {topic
          ? <span>{topic}</span>
          : presenterOrganizations?.length
            ? presenterOrganizations.map(o => o.name).join(', ')
            : <span className='text-gray-500'>No meeting topic</span>}
      </div>
    );
  };

  const PlenaryMeetingDescription = () => {
    return (
      <div className={`${classNameAgendaBlockAttendees} w-7/12 pr-2 sm:pr-8`}>
        <div className='flex text-primary font-bold mt-2'>
          <span className='ml-3 mr-2'>&#x25CF;</span>
          <MeetingTopic />
        </div>
        {notes && <p className='font-size-14px pl-8 h-full break-words overflow-hidden'>{notes}</p>}
      </div>);
  };

  const MeetingDescription = () => {

    return access !== 'CLOSED'
      ? <PlenaryMeetingDescription />
      : <div className={`${classNameAgendaBlockAttendees} w-7/12`}>
        {((presenterOrganizations !== null && !presenterOrganizations?.length) || (presenterOrganizations === null && !participantOrganizations?.length))
          && <MeetingTopic className='font-medium font-size-18px mt-2 mx-8' />}
        {presenterOrganizations && <OrganizationsList blockName='' organizations={presenterOrganizations} />}
        {participantOrganizations &&
          <OrganizationsList
            blockName={presenterOrganizations ? 'Attendees:' : ''}
            organizations={participantOrganizations}
          />}
      </div>;
  };

  return (<>
    <div className={`${classNameAgendaBlock} flex flex-row pb-4 pt-3 px-5 bg-primary-lighter-hover`}>
      <div className={`${classNameAgendaBlockDate} w-3/12`}>
        <MeetingTimingBlock meetingDetails={props.meeting} timeZone={props.timeZone} hideStartDate={true} />
      </div>

      <MeetingDescription />

      <div className={`${classNameAgendaBlockButton} w-2/12 text-right mt-2`}>
        <Button
          name='meetingItem'
          data-meeting-id={meetingId}
          type='button'
          onClick={() => { history.push(`/agenda/${props.eventId}/meeting/${meetingId}`); }}
          label={isConnectBtnDisabled ? 'View Details' : 'Join'}
          className={`px-2 lg:px-6 py-3 w-full rounded ${isConnectBtnDisabled ? 'bg-white border font-medium border-gray-400 text-primary' : 'bg-primary text-white'}`}
        />
      </div>
    </div>
    <hr />
  </>);
};

export default MeetingBlock;
