import { ResponseError } from '../../../config/api';
import { useSWR, responseInterface } from '../../../config/overrides/swr';
import API, { EventPublicDetailsResponseType, PUBLIC } from '../../../lib/api';
import useEventSubdomain from '../../use-event-subdomain';

const { fetchPublicEventDetailsBySubdomain } = API[PUBLIC];

/* bypassing api calls from MeetLinks to Passport API till while no support for MeetLinks  */
export function useEventPublicInfo(bypassApiCall = false): responseInterface<EventPublicDetailsResponseType, ResponseError> {
  const subdomain = useEventSubdomain();
  const keyFn = () => bypassApiCall ? null : subdomain;

  return useSWR(keyFn, fetchPublicEventDetailsBySubdomain);
}
