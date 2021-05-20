import React from 'react';
import { RouteProps, Redirect } from 'react-router-dom';
import { HTTP_STATUS } from '../../config/api';
import { NOT_FOUND_PATH } from '../../config/routes/paths';
import { IAuthContext, useAuth } from '../../lib/context-providers/auth-context';
import LoginWrapper from "./LoginWrapper/LoginWrapper";

import { useEventPublicInfo } from '../../hooks/api/public/use-event-public-details';



export const PassportPlaceholder: React.FC<RouteProps> = (props: RouteProps): JSX.Element | null => {
  const { isValidating, error, data } = useEventPublicInfo();

  console.log("useEventPublicInfo",useEventPublicInfo())
  const auth = useAuth() as IAuthContext;

  if (error && error.status === HTTP_STATUS.NOT_FOUND) return <Redirect to={NOT_FOUND_PATH} />;
  if (!isValidating && data && auth.isAuthenticated === false) return <LoginWrapper data={data} signIn={auth.signIn}/>;

  return null;
};

