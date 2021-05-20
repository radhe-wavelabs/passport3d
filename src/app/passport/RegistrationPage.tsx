import React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import { ROOT } from '../../config/routes/paths';
import { IEventCustomSettings, useCustomSettings } from '../../hooks/use-custom-settings';
import { useEventPublicInfo } from '../../hooks/api/public/use-event-public-details';
import RegistrationWrapper from './RegistrationWrapper/RegistrationWrapper';

export const RegistrationPage: React.FC<RouteProps> = (props: RouteProps): JSX.Element | null => {
  const { registrationEnabled } = useCustomSettings() as IEventCustomSettings;
  const { data } = useEventPublicInfo();

  if (data && registrationEnabled) return <RegistrationWrapper data={data}/>;
  if (registrationEnabled === false) return <Redirect to={ROOT} />;
  return null;
};

