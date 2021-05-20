import { ResponseError } from '../../../config/api';
import { useSWR, responseInterface } from '../../../config/overrides/swr';
import API, { PROTECTED, EVENT, MEETING, PrivateMeetingDetailsResponseType } from '../../../lib/api';
import { IAuthContext, useAuth } from '../../../lib/context-providers/auth-context';

const { fetchMeetingPrivateDetails } = API[PROTECTED];

export function useMeetingPrivateDetails(eventId: string, meetingId: string): responseInterface<PrivateMeetingDetailsResponseType, ResponseError> {
  const auth = useAuth() as IAuthContext;

  const keyFn = () => [auth.isAuthenticated, eventId, meetingId].every(Boolean) ? [ EVENT, eventId, MEETING, meetingId ] : null;

  return useSWR(keyFn, fetchMeetingPrivateDetails);
}
