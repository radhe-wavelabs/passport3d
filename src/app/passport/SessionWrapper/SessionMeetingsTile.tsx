import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, ButtonProps } from '../../../components/_base/Button';
import Icon from '../../../components/_base/Icon';
import useConnectMeetingDisabled from '../../../hooks/use-connect-meeting-disabled';
import { JOIN_STATUS } from '../../../lib/constants';
import API, {
  EventPrivateDetailsResponseType,
  MeetingOrganizationDetailsListType,
  PrivateMeetingSessionDetailsResponseType,
  PROTECTED
} from '../../../lib/api';
import './GeneralSessions.scss';

interface IProps {
  meeting: PrivateMeetingSessionDetailsResponseType,
  event: EventPrivateDetailsResponseType,
  isExpandedView: boolean,
  changeJoinStatus: (newJoinStatus: string) => void
}

const SessionMeetingsTile: React.FC<IProps> = (props: IProps): JSX.Element => {
  const history = useHistory();
  const { meeting, event, changeJoinStatus } = props;
  const [joinStatus, setJoinStatus] = useState(meeting.joinStatus);
  const { attendMeeting, leaveMeeting } = API[PROTECTED];

  const isConnectBtnDisabled = useConnectMeetingDisabled(props.event, props.meeting.startDateTime);
  const isAddBtnShown = meeting.access === 'OPEN';

  const className = 'editable-session';
  const classNameSessionTableCellTitle = `${className}--table-cell-title`;
  const classNameSessionTableCellButtons = `${className}--table-cell-buttons`;
  const classNameSessionTableCellBtnJoin = `${className}--table-cell-btn-join`;
  const classNameSessionTableCellBtnAdd = `${className}--table-cell-btn-add`;

  
  const getMeetingTopic = (orgs: MeetingOrganizationDetailsListType = []): JSX.Element => {
    const meetingTopicClassName = props.isExpandedView ? 'font-size-16px font-semibold text-primary' : 'font-size-12px';
    return <span className={meetingTopicClassName}>
      {props.meeting.topic
        ? props.meeting.topic
        : (orgs.length)
          ? <span>{orgs.map(o => o.name).join(', ')}</span>
          : <span className='text-gray-500'>No meeting topic</span>}
    </span>;
  };

  const toggleGeneralSession = () => {
    const oldJoinStatus = joinStatus;
    let newJoinStatus = JOIN_STATUS.JOINED_AS_REGISTRANT;

    switch (oldJoinStatus) {
    case JOIN_STATUS.NOT_JOINED:
      attendMeeting(event.eventId.toString(), meeting.meetingId)
        .then(() => changeJoinStatus(newJoinStatus))
        .catch(() => setJoinStatus(oldJoinStatus));
      setJoinStatus(newJoinStatus);
      return;
    case JOIN_STATUS.JOINED_AS_REGISTRANT:
      newJoinStatus = JOIN_STATUS.NOT_JOINED;
      leaveMeeting(event.eventId.toString(), meeting.meetingId)
        .then(() => changeJoinStatus(newJoinStatus))
        .catch(() => setJoinStatus(oldJoinStatus));
      setJoinStatus(newJoinStatus);
      return;
    default: return;
    }
  };

  const getMeetingPresentersList = (orgs: MeetingOrganizationDetailsListType = []): JSX.Element => {
    return <div className='font-size-12px'>
      {!!orgs.length && orgs.flatMap(o => o.attendees?.map((a) =>
        <p className='py-2' key={a.attendeeId}>
          <span className='font-semibold'>{`${a.firstName} ${a.lastName}`}</span>
          {a.title && (a.firstName || a.lastName) ? ', ' : ''}{a.title}, {o.name}
        </p>))}
    </div>;
  };

  const getJoinBtnClassName = (): string => {
    let joinBtnClassName = 'font-size-11px rounded whitespace-no-wrap ';
    joinBtnClassName += props.isExpandedView ? 'px-4 py-2 my-5 mx-5 ' : 'px-3 py-1 my-3 mx-3 ';
    joinBtnClassName += isConnectBtnDisabled ? 'bg-white border border-gray-400 text-primary' : 'bg-primary text-white';
    joinBtnClassName += ' '+ classNameSessionTableCellBtnJoin;
    return joinBtnClassName;
  };

  const getAddRemoveBtnClassName = (): string => {
    let addRemoveBtnClassName = 'font-size-11px font-semibold add-remove-btn ';
    addRemoveBtnClassName += props.isExpandedView
      ? 'grid items-center rounded my-5 mr-5 py-2 px-5 bg-white border border-gray-400'
      : 'border-t p-2 w-full hover:bg-gray-100';
    addRemoveBtnClassName += joinStatus === JOIN_STATUS.JOINED_AS_REGISTRANT ? ' hover-label-btn' : '';
    addRemoveBtnClassName += joinStatus === JOIN_STATUS.JOINED_AS_REGULAR ? ' cursor-not-allowed' : '';
    addRemoveBtnClassName += joinStatus !== JOIN_STATUS.NOT_JOINED && props.isExpandedView ? ' w-112px' : '';
    addRemoveBtnClassName += ' ' + classNameSessionTableCellBtnAdd;
    return addRemoveBtnClassName;
  };

  const getAddRemoveBtnParams = (): ButtonProps => {
    const labelClassName = 'inline-block align-middle line-height-20px truncate w-full ';
    const fullLabelText = `Add to ${props.event.agendaLabel ?? 'My Schedule'}`;
    const shortLabelText = `Add`;

    const addLabel =
      <span className={labelClassName + 'text-primary'}>
        <Icon.Add className='mr-1 fill-primary align-top' viewBox="0 0 24 24"/>
        {props.isExpandedView ? fullLabelText : shortLabelText}
      </span>;
    const addedLabel =
      <span className={labelClassName + 'text-gray'}>
        <Icon.Added className='mr-1 fill-gray align-top' viewBox="0 0 24 24"/>Added
      </span>;
    const removeLabel =
      <span className={labelClassName + 'text-primary'}>
        <Icon.Remove className='mr-1 fill-primary align-top' viewBox="1 1 18 18" height="16" width="16" /> Remove
      </span>;

    const addRemoveBtn = joinStatus === JOIN_STATUS.NOT_JOINED
      ? addLabel
      : joinStatus === JOIN_STATUS.JOINED_AS_REGULAR
        ? addedLabel
        : <>{addedLabel}{removeLabel}</>;

    const addRemoveBtnParams: ButtonProps = {
      name: 'meetingItem',
      type: 'button',
      onClick: toggleGeneralSession,
      label: addRemoveBtn,
      className: getAddRemoveBtnClassName(),
      'data-meeting-id': meeting.meetingId
    };

    if (!props.isExpandedView && joinStatus === JOIN_STATUS.NOT_JOINED) {
      addRemoveBtnParams['data-tooltip'] = `Add to ${props.event.agendaLabel ?? 'My Schedule'}`;
      addRemoveBtnParams['data-tooltip-position'] = 'bottom';
    }
    return addRemoveBtnParams;
  };

  return (
    <div
      className={`${props.isExpandedView ? '' : 'h-full '}mb-2 bg-white sm-shadow-gray flex flex-col justify-between`}
      key={props.meeting.meetingId}
    >
      <div className={`${classNameSessionTableCellTitle} ${props.isExpandedView ? 'px-5 pt-5 pb-3' : 'p-3'} flex flex-col justify-between items-start`}>
        <div className='h-full break-words overflow-hidden'>
          {getMeetingTopic(props.meeting.presenterOrganizations)}
          {props.isExpandedView && getMeetingPresentersList(props.meeting.presenterOrganizations)}
        </div>
      </div>
      <div className={classNameSessionTableCellButtons + (props.isExpandedView ? ' flex justify-between' : '')}>
        <Button
          name='meetingItem'
          data-meeting-id={props.meeting.meetingId}
          type='button'
          onClick={() => {history.push(`/session/${props.event.eventId}/meeting/${props.meeting.meetingId}`);}}
          label={isConnectBtnDisabled ? 'View Details' : 'Join'}
          className={getJoinBtnClassName()}
        />
        {isAddBtnShown &&
          <Button {...getAddRemoveBtnParams()}/>}
      </div>
    </div>);
};

export default SessionMeetingsTile;
