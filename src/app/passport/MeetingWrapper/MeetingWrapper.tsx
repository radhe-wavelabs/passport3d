import React from 'react';
import { responseInterface } from 'swr';
import MeetingDetails from '../../../app/shared/MeetingDetails';
import EventDetails from '../../../app/shared/EventDetails';
import { HTTP_STATUS, ResponseError } from '../../../config/api';
import { useMeetingPrivateDetails } from '../../../hooks/api/protected/use-meeting-private-details';
import useConnectToPrivateMeetingMethod from '../../../hooks/use-connect-to-private-meeting-method';
import { useMeetingId } from '../../../hooks/use-meeting-id';
import { useEventId } from '../../../hooks/use-event-id';
import { PrivateMeetingDetailsResponseType } from '../../../lib/api';
import { EventSettingsContextType, useEventSettings } from '../../../lib/context-providers/event-settings-context';
import JoinButton from '../../shared/JoinButton';
import { Redirect } from 'react-router-dom';
import useConnectMeetingDisabled from '../../../hooks/use-connect-meeting-disabled';
import useDefaultRoutePage from '../../../hooks/use-default-route-page';

const MeetingWrapper: React.FC = () => {
  const meetingId = useMeetingId();
  const eventId = useEventId();
  const eventSettings = useEventSettings() as EventSettingsContextType;
  const landingPage = useDefaultRoutePage();
  const { data: meetingDetails, error } = useMeetingPrivateDetails(eventId, meetingId) as responseInterface<PrivateMeetingDetailsResponseType, ResponseError>;
  const isConnectBtnDisabled = useConnectMeetingDisabled(eventSettings, meetingDetails?.startDateTime);

  if (error && (error.status === HTTP_STATUS.FORBIDDEN || error.status === HTTP_STATUS.NOT_FOUND)) {
    return <Redirect to={landingPage} />;
  }

  if (eventSettings && meetingDetails) {
    return (
      <>
        <EventDetails details={eventSettings}/>
        <MeetingDetails
          meetingDetails={meetingDetails}
          showTopNavBtns={true}
          timeZone={eventSettings.timeZone}
          agendaLabel={eventSettings.agendaLabel}
          showDetailsAllowed={!isConnectBtnDisabled}
        >
          <JoinButton
            isDisabled={isConnectBtnDisabled}
            meetingDetails={meetingDetails}
            useConnectToMeetingMethod={useConnectToPrivateMeetingMethod}
          />
        </MeetingDetails>
      </>
    );
  }
  return null;
};

export default MeetingWrapper;
