import { ResponseError } from '../../../config/api';
import { IAuthContext, useAuth } from '../../../lib/context-providers/auth-context';
import API, { ATTENDEE, CurrentUserResponseType, INFO, PROTECTED } from '../../../lib/api';
import { useSWR, responseInterface } from '../../../config/overrides/swr';


const { fetchCurrentUserInfo } = API[PROTECTED];
export function useCurrentUserInfo(): responseInterface<CurrentUserResponseType, ResponseError> {
  const auth = useAuth() as IAuthContext;

  const keyFn = () => auth.isAuthenticated ? [ ATTENDEE, INFO ] : null;

  return useSWR(keyFn, fetchCurrentUserInfo);
}

