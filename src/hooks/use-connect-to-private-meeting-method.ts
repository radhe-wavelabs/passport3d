import { useHistory } from 'react-router';
import { SHOWCASE_PATH } from '../config/routes/paths';
import { CurrentUserResponseType, PrivateMeetingDetailsResponseType } from '../lib/api';
import { getKvContentKnovioUrl } from '../lib/api/utils';
import { useEventSettings, EventSettingsContextType } from '../lib/context-providers/event-settings-context';
import TrackingParamsMapper from '../lib/kv-embed/KvEmbedTrackingDataMapper';
import { useCurrentUserInfo } from './api/protected/use-current-user-info';
import useDefaultRoutePage from './use-default-route-page';

type KeysType = 'attendeeLink' | 'showcasePagePath' | 'connectionLink' | 'connectionDefined' | 'embedCodeId';
export type ConnectionPrivateDetailsType = Pick<PrivateMeetingDetailsResponseType, KeysType> | void;


/*
* Connection method precedence:
* 1 - Attendee level connection
* 1.1 - embedCodeId
* 1.2 - connectionLink
* 2 - Room Level connection:
* 2.1 - Showcase Page Path
* 2.2 - Link set for an Attendee
*/

export const openWindow = (url?: string): void => {
  window.open(url ?? '', '_blank');
};



export default function useConnectToPrivateMeetingMethod(details: ConnectionPrivateDetailsType): () => void {
  const history = useHistory();

  const { data } = useCurrentUserInfo();
  const { showcaseEnabled } = useEventSettings() as EventSettingsContextType || {};
  const defaultPage = useDefaultRoutePage();

  return () => {
    if (!details) return;

    const { attendeeLink, showcasePagePath, connectionLink, connectionDefined, embedCodeId } = details;

    if (connectionDefined) {
      if (embedCodeId) {
        const trackingParams = TrackingParamsMapper.mapToParams(data as CurrentUserResponseType);
        const queryParams = Object.entries(trackingParams).map(([key, val]) => `${key}=${val}`).join('&');
        const url = `${getKvContentKnovioUrl(embedCodeId)}?${queryParams}`;

        return openWindow(url);
      }

      return openWindow(connectionLink);
    }

    if (showcasePagePath) {
      return showcaseEnabled ? history.push(SHOWCASE_PATH, { showcasePagePath }) : history.push(defaultPage as string);
    }

    return openWindow(attendeeLink);
  };
}
