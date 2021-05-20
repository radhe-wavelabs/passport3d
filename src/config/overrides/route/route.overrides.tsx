import React, { ReactNode } from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { useEventPrivateInfo } from '../../../hooks/api/protected/use-event-private-details';
import { useEventPublicInfo } from '../../../hooks/api/public/use-event-public-details';
import { IEventCustomSettings, useCustomSettings } from '../../../hooks/use-custom-settings';
import { useAuth, IAuthContext } from '../../../lib/context-providers/auth-context';
import { HTTP_STATUS } from '../../api';
import { RoutesConfig } from '../../routes';
import { NOT_FOUND_PATH, ROOT } from '../../routes/paths';
import useDefaultRoutePage from '../../../hooks/use-default-route-page';

/* ALLOWED ONLY FOR AUTHENTICATED USER  */
export const ProtectedRoute: React.FC<RoutesConfig> = ({ component, ...rest }: RoutesConfig): JSX.Element => {
  const { isAuthenticated } = useAuth() as IAuthContext;
  const Component = component as React.FC;
  const is404 = [useEventPublicInfo(), useEventPrivateInfo()]
    .some(({ error }) => error?.status === HTTP_STATUS.NOT_FOUND);

  if (is404) return <Redirect to={NOT_FOUND_PATH} />;

  return (
    <Route
      {...rest}
      render={(props: RouteProps) => {
        if (isAuthenticated === null) return null;
        return isAuthenticated ? <Component {...props} /> : <Redirect to={ROOT} />;
      }}
    />);
};

/* ALLOWED FOR AUTHENTICATED AND NON-AUTHENTICATED USER */
export const RouteWithRedirect: React.FC<RoutesConfig> = ({ component, ...rest }: RoutesConfig): JSX.Element => {
  const auth = useAuth() as IAuthContext;
  const Component = component as React.FC<RouteComponentProps>;
  const defaultRoutePage = useDefaultRoutePage();

  const render = (props: RouteComponentProps) => {
    const { match: { path, isExact }, history } = props;
    if (auth.isAuthenticated && path === ROOT && isExact) {
      if (defaultRoutePage) {
        history.replace(defaultRoutePage);
      }
    }
    return <Component {...props} />;
  };

  return (
    <Route {...{ ...rest, render }} />
  );
};

/* ALLOWED ONLY FOR NON-AUTHENTICATED USER */
export const PublicRoute: React.FC<RoutesConfig> = ({ component, ...rest }: RoutesConfig): JSX.Element => {
  const { isAuthenticated } = useAuth() as IAuthContext;
  const { nonExisted } = useCustomSettings() as IEventCustomSettings;
  const defaultRoutePage = useDefaultRoutePage();
  const Component = component as React.FC<RouteComponentProps>;

  const render = (props: RouteComponentProps): ReactNode => {
    if (nonExisted) return <Redirect to={NOT_FOUND_PATH} />;
    if (isAuthenticated === false && props.match.isExact) return <Component {...props} />;
    if (isAuthenticated) return <Redirect to={defaultRoutePage} />;
  };

  return (
    <Route {...{ ...rest, render }} />
  );
};

export const PassportRoute: React.FC<RoutesConfig> = ({ _protected, _public, ...rest }: RoutesConfig): JSX.Element => {
  if (_protected) return <ProtectedRoute { ...rest } />;
  if (_public) return <PublicRoute { ...rest } />;
  return <RouteWithRedirect { ...rest } />;
};

