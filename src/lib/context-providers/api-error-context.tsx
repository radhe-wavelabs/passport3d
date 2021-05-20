import React, { createContext, useContext, useEffect, useState } from 'react';
import { ResponseError } from '../../config/api';
import { TRACK } from '../api';
import { composeUrl } from '../api/utils';
import { ApiErrorSubscription } from '../services/subscriptions';


export type ApiErrorContextType = {
  hasError: () => boolean;
  resetErrorState: () => void;
}

const useApiErrorProvider = () => {
  const [ error, setError ] = useState<ResponseError | null>(null);

  const hasError = (): boolean => Boolean(error);
  const resetErrorState = (): void => setError(null);

  const setApiError = (e: ResponseError): void => {
    if (e.url && e.url === composeUrl(TRACK)) return;
    setError(e);
  };

  useEffect(() => {
    ApiErrorSubscription.subscribe(setApiError);
    return () => {
      ApiErrorSubscription.unsubscribe(setApiError);
    };
  }, []);

  return {
    hasError, resetErrorState
  };

};

const ApiErrorContext = createContext<ApiErrorContextType | void>(undefined);

type Props = {
  children: React.ReactNode | React.ReactNodeArray
}

export const ApiErrorProvider: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  const apiErrors = useApiErrorProvider() as ApiErrorContextType;

  return (
    <ApiErrorContext.Provider value={apiErrors}>
      {props.children}
    </ApiErrorContext.Provider>
  );
};

export const useApiErrors = (): ApiErrorContextType | void => useContext(ApiErrorContext);

export default ApiErrorProvider;
