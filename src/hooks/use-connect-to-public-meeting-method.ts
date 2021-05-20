import { PublicMeetingDetailsResponseType } from '../lib/api';
import { getKvContentKnovioUrl } from '../lib/api/utils';
import { KV_PARAMS } from '../lib/kv-embed/KvEmbedTrackingService';
import useAttendeeToken from './use-attendee-token';

type KeysType = 'attendeeLink' | 'connectionLink' | 'connectionDefined' | 'embedCodeId';
export type ConnectionPublicDetailsType = Pick<PublicMeetingDetailsResponseType, KeysType> | void;


/*
* Connection method precedence:
* 1 - Attendee level connection
* 1.1 - embedCodeId
* 1.2 - connectionLink
* 2 - Room Level connection:
* 2.2 - Link set for an Attendee
*/

export const openWindow = (url?: string): void => {
  window.open(url ?? '', '_blank');
};

export default function useConnectToPublicMeetingMethod(details: ConnectionPublicDetailsType): () => void {
  const attendeeToken = useAttendeeToken();

  return () => {
    if (!details) return;

    const { attendeeLink, connectionLink, connectionDefined, embedCodeId } = details;

    if (connectionDefined) {
      if (embedCodeId) {
        const url = `${getKvContentKnovioUrl(embedCodeId)}?${KV_PARAMS.KV_ID}=${attendeeToken}`;

        return openWindow(url);
      }

      return openWindow(connectionLink);
    }

    return openWindow(attendeeLink);
  };
}
