import { ResponseError } from '../../../config/api';
import { useSWR, responseInterface } from '../../../config/overrides/swr';
import { IAuthContext, useAuth } from '../../../lib/context-providers/auth-context';
import API, { PROTECTED, EVENT, SESSION } from '../../../lib/api';

const { fetchMeetingPrivateSessionList } = API[PROTECTED];

export function usePrivateSessionMeetingsList(eventId: string): responseInterface<typeof fetchMeetingPrivateSessionList, ResponseError> {
  const auth = useAuth() as IAuthContext;

  const keyFn = () => auth.isAuthenticated && eventId ? [ EVENT, eventId, SESSION ] : null;

  return useSWR(keyFn, fetchMeetingPrivateSessionList);
}

