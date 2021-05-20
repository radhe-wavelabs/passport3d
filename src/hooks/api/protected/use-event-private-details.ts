import { ResponseError } from '../../../config/api';
import { IAuthContext, useAuth } from '../../../lib/context-providers/auth-context';
import useEventSubdomain from '../../use-event-subdomain';
import API, { PROTECTED, EVENT, EventPrivateDetailsResponseType } from '../../../lib/api';
import { useSWR, responseInterface } from '../../../config/overrides/swr';

const { fetchEventPrivateDetails } = API[PROTECTED];

export function useEventPrivateInfo(): responseInterface<EventPrivateDetailsResponseType, ResponseError> {
  const subdomain = useEventSubdomain();
  const auth = useAuth() as IAuthContext;

  const keyFn = () => auth.isAuthenticated && subdomain ? [EVENT, subdomain] : null;

  return useSWR(keyFn, fetchEventPrivateDetails);
}

