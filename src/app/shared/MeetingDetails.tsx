import React, { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useEventPrivateInfo } from '../../hooks/api/protected/use-event-private-details';
import { getConfigByPath } from '../../hooks/use-navbar-items';
import { PrivateMeetingDetailsResponseType } from '../../lib/api';
import { BACKGROUND_IMG_URL } from '../../lib/constants';
import MeetingTimingBlock from './MeetingTimingBlock';
import OrganizationsList from '../../app/shared/OrganizationsList';
import { AGENDA_PATH, SESSION_PATH } from '../../config/routes/paths';
import { Button } from '../../components/_base/Button';
import Icon from '../../components/_base/Icon';


export interface IProps {
  meetingDetails: PrivateMeetingDetailsResponseType;
  showDetailsAllowed?: boolean;
  timeZone: string;
  children: ReactNode;
  showTopNavBtns?: boolean;
  agendaLabel?: string;
}

const PREVENTED_DETAILS_TEXT = 'Connection Details will be provided before this meeting begins.';

const MeetingDetails: React.FunctionComponent<IProps> = (props: IProps) => {
  const { data } = useEventPrivateInfo();
  const history = useHistory();
  const path = window.location.pathname.startsWith(AGENDA_PATH) ? AGENDA_PATH : SESSION_PATH;
  const { label } = (path && data && getConfigByPath(path, data)) || { label: props.agendaLabel || 'Agenda' };

  const backToList = () => history.push(path || AGENDA_PATH);

  const { meetingDetails: details, showDetailsAllowed } = props;

  const connectionDetails = details.connectionDefined ? details.meetingInvitation : details.connectionDetails;


  return (
    <div className='md:w-3/4 w-100'>
      <div className='shadow-gray bg-white mx-auto md:px-8 px-0 p-8 mt-12 min-h-24rem'>
        {props.showTopNavBtns && <>
          <div className='px-8 pb-8'>
            <Button
              name='backToList'
              type='button'
              className='p-0 rounded-md text-primary bg-transparent'
              onClick={backToList}
              label={
                <>
                  <span className='pr-1'>
                    <Icon.RightArrow
                      className='mb-1 fill-primary transform rotate-180'
                      width='15px'
                      height='15px'
                    />
                  </span>
                  <span className='font-size-13px'>{label}</span>
                </>}
            >
            </Button>
          </div>
          <hr/>
        </>}

        <div className='block sm:flex flex-none sm:flex-row items-start items-stretch max-h-full min-h-full'>
          <div className='flex-equal sm:flex-1 px-6 md:px-0 overflow-x-auto py-6 sm:pb-0'>
            <div className='pt-2 xs:pt-8 pb-5 sm:pl-8 sm:pr-12'>
              <MeetingTimingBlock meetingDetails={props.meetingDetails} timeZone={props.timeZone}/>
              {props.meetingDetails.type && <p className='text-sm'>
                <span className='text-primary text-xs font-bold'>Meeting type:&nbsp;</span>
                <span className='text-xs'>{props.meetingDetails.type}</span>
              </p>}
            </div>
            {(props.meetingDetails.topic || props.meetingDetails.notes) && <div className='pt-3 pb-5 px-0 sm:pl-8 sm:pr-12'>
              <p className='text-primary font-semibold font-size-18px pb-1'>{props.meetingDetails.topic}</p>
              <p className='text-sm'>{props.meetingDetails.notes}</p>
            </div>}
            {props.meetingDetails.presenterOrganizations && <OrganizationsList blockName='' organizations={props.meetingDetails.presenterOrganizations}/>}
            {props.meetingDetails.participantOrganizations &&
              <OrganizationsList
                blockName={props.meetingDetails.presenterOrganizations ? 'Attendees:' : ''}
                organizations={props.meetingDetails.participantOrganizations}
              />}
            {props.meetingDetails.hostOrganizations && <OrganizationsList blockName='Hosted by:' organizations={props.meetingDetails.hostOrganizations}/>}
          </div>

          <div className='flex-equal sm:flex-1 overflow-hidden bg-primary-lighter'>
            <div className='overflow-x-auto pb-8'>
              <div className='text-left p-8'>
                {props.children}
              </div>
              {connectionDetails && <div className='px-8 font-size-14px'>
                <div className='font-semibold'>Connection Details</div>
                <div className='pt-4 whitespace-pre-wrap leading-loose'>
                  { showDetailsAllowed ? connectionDetails : PREVENTED_DETAILS_TEXT }
                </div>
              </div>
              }
            </div>
          </div>
        </div>
        {!props.meetingDetails && <p className='text-center pt-4 pb-8'>No meeting details yet</p>}
      </div>
      <img className='background-img' src={BACKGROUND_IMG_URL} alt=''/>
    </div>
  );
};

MeetingDetails.defaultProps = {
  showDetailsAllowed: true
};

export default MeetingDetails;
