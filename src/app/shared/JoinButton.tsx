import React from 'react';
import useConnectToPrivateMeetingMethod, { ConnectionPrivateDetailsType } from '../../hooks/use-connect-to-private-meeting-method';
import Button from '../../components/button';
import Icon from '../../components/_base/Icon';
import useConnectToPublicMeetingMethod, { ConnectionPublicDetailsType } from '../../hooks/use-connect-to-public-meeting-method';
import { PrivateMeetingDetailsResponseType, PublicMeetingDetailsResponseType } from '../../lib/api';
import { getKvThumbnailUrl } from '../../lib/api/utils';

export type JoinButtonProps = {
  isDisabled: boolean;
  meetingDetails: PrivateMeetingDetailsResponseType | PublicMeetingDetailsResponseType | void;
  useConnectToMeetingMethod: typeof useConnectToPrivateMeetingMethod | typeof useConnectToPublicMeetingMethod;
}

type ConnectionDetailsType = ConnectionPrivateDetailsType & ConnectionPublicDetailsType

export const ThumbnailJoinButton: React.FunctionComponent<JoinButtonProps> = (props): JSX.Element | null => {
  const { meetingDetails, useConnectToMeetingMethod } = props;
  const connectToMeeting = useConnectToMeetingMethod(meetingDetails as ConnectionDetailsType);

  if (!meetingDetails) return null;

  return (
    <Button.Thumbnail
      className={'bg-transparent'}
      name='join'
      onClick={connectToMeeting}
    >
      <img
        className='h-full w-full object-contain'
        alt='knovio thumbnail'
        src={getKvThumbnailUrl(meetingDetails.embedCodeId)}
      />
    </Button.Thumbnail>
  );
};


export const JoinButton: React.FC<JoinButtonProps> = (props: JoinButtonProps): JSX.Element | null => {
  const { isDisabled, meetingDetails, useConnectToMeetingMethod } = props;
  const connectDetails = isDisabled ? undefined : props.meetingDetails;
  const connectToMeeting = useConnectToMeetingMethod(connectDetails as ConnectionDetailsType);

  if (!meetingDetails) return null;

  return (
    <Button.Common
      name='join'
      disabled={isDisabled}
      onClick={connectToMeeting}
      label='Connect to Meeting'
      data-meeting-id={meetingDetails.meetingId}
    >
      <Icon.RightArrow className='fill-current text-white mb-1 ml-2' height='15px' width='15px'/>
    </Button.Common>
  );
};

export default (props: JoinButtonProps): JSX.Element | null => {
  if (!props.meetingDetails) return null;

  return props.meetingDetails.connectionDefined && props.meetingDetails.embedCodeId
    ? <ThumbnailJoinButton {...props} />
    : <JoinButton {...props} />
  ;
};
