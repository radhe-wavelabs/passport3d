import React, { createContext, useContext, useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import { HTTP_STATUS } from '../../config/api';
import { useAuthError, UseAuthError, AuthError } from './use-auth-error';

import { useEventPublicInfo } from '../../hooks/api/public/use-event-public-details';

import { authenticate, validateCurrentAuthenticatedUser, invalidate } from '../auth';

export type IAuthContext = {
  isAuthenticated: boolean | null,
  authError: AuthError,
  resetAuthError(): void,
  signIn(email: string, accessCode: string): Promise<void>,
  signOut(): Promise<void>,
  forceSignOut(): Promise<void>
}



const useAuthProvider = () => {
  const [ isAuthenticated, setAuthStatus ] = useState<boolean | null>(null);
  const setAsAuthenticated = (): void => setAuthStatus(true);
  const setAsNotAuthenticated = (): void => setAuthStatus(false);

  const { error: authError, setError } = useAuthError() as UseAuthError;
  const resetAuthError = () => setError(null);

  const { data } = useEventPublicInfo();

  useEffect(() => {
    validateCurrentAuthenticatedUser()
      .then(setAsAuthenticated)
      .catch(setAsNotAuthenticated);
  }, []);

  const signIn = async (email: string, accessCode: string): Promise<void> => {
    try {
      const username = `${email.trim()}_${data?.eventId}`;
      await authenticate(username, accessCode);
      setAsAuthenticated();
    } catch (e) {
      setAsNotAuthenticated();
      setError(e);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await invalidate();
    } finally {
      setAsNotAuthenticated();
    }
  };

  const forceSignOut = async (): Promise<void> => {
    setAsNotAuthenticated();
    await invalidate();
  };

  return {
    isAuthenticated, authError, resetAuthError,
    signIn, signOut, forceSignOut
  };
};

const authContext = createContext<IAuthContext | void>(undefined);

type Props = {
  children: React.ReactNode | React.ReactNodeArray
}

export const AuthProvider: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const auth = useAuthProvider() as IAuthContext;
  const onError = async (error: AuthError): Promise<void> => {
    if (error?.status === HTTP_STATUS.UNAUTHORIZED) await auth.forceSignOut();
  };

  return (
    <authContext.Provider value={auth}>
      <SWRConfig value={{ onError }}>
        {children}
      </SWRConfig>
    </authContext.Provider>
  );
};

export const useAuth = (): IAuthContext | void => useContext(authContext);

export default AuthProvider;
