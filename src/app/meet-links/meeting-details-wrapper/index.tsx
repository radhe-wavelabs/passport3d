import React from 'react';
import useAttendeeToken from '../../../hooks/use-attendee-token';
import useConnectToPublicMeetingMethod from '../../../hooks/use-connect-to-public-meeting-method';
import MeetingDetails from '../../shared/MeetingDetails';
import EventDetails from '../../shared/EventDetails';
import PasscodeModal from './passcode-modal';
import useMeetingPublicDetails, { useMeetingDetailsWithPasscode } from '../../../hooks/api/public/use-meeting-public-details';
import JoinButton from '../../shared/JoinButton';

type Props = Record<string, unknown>

export const MeetingDetailsWrapper: React.FC<Props> = (props: Props): JSX.Element | null => {
  const noAttendeeToken = !useAttendeeToken();
  const { data, error = { message: '' }, isLoading } = useMeetingPublicDetails();
  /* Disable authorization with passcode if attendeeToken provided, as this story isn't implemented yet QU-6688 */
  const { setPasscode: authorize, error: inputError } = useMeetingDetailsWithPasscode(noAttendeeToken);
  const errorMessage = inputError ? inputError.message : error.message;

  if (!isLoading && !data) return <PasscodeModal errorMessage={errorMessage} onSetPasscode={authorize} />;
  if (data) {
    const eventInfo = {
      startTime: data.eventStartDateTime,
      endTime: data.eventEndDateTime,
      name: data.eventName,
      timeZone: data.timeZone
    };
    return (
      <>
        <EventDetails details={eventInfo} />
        <MeetingDetails meetingDetails={data} timeZone={data.timeZone}>
          <JoinButton
            isDisabled={!data}
            meetingDetails={data}
            useConnectToMeetingMethod={useConnectToPublicMeetingMethod}
          />
        </MeetingDetails>
      </>
    );
  }
  return null;
};

export default MeetingDetailsWrapper;
