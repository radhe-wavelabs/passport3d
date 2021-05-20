import { ResponseError } from '../../../config/api';
import { useSWR, responseInterface } from '../../../config/overrides/swr';
import { IAuthContext, useAuth } from '../../../lib/context-providers/auth-context';
import API, { PROTECTED, EVENT, MEETING, LIST } from '../../../lib/api';


const { fetchEventPrivateMeetingList } = API[PROTECTED];

export function useEventPrivateMeetingsList(eventId: string): responseInterface<typeof fetchEventPrivateMeetingList, ResponseError> {
  const auth = useAuth() as IAuthContext;
  const keyFn = () => auth.isAuthenticated && eventId ? [ EVENT, eventId, MEETING, LIST ] : null;

  return useSWR(keyFn, fetchEventPrivateMeetingList);
}
