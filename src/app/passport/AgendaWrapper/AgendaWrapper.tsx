import React from 'react';
import AgendaDetails from './AgendaDetails';
import { useEventPrivateInfo } from '../../../hooks/api/protected/use-event-private-details';
import EventDetails from '../../shared/EventDetails';
import { Redirect } from 'react-router-dom';
import useDefaultRoutePage from '../../../hooks/use-default-route-page';

const AgendaWrapper = (): JSX.Element | null => {
  const { data, isValidating } = useEventPrivateInfo();
  const landingPage = useDefaultRoutePage();

  if (!data) return null;

  if (!data.agendaEnabled) {
    return <Redirect to={landingPage} />;
  }

  if (!isValidating && data) return (
    <>
      <EventDetails details={data}/>
      <AgendaDetails event={data}/>
    </>
  );
  return null;
};

export default AgendaWrapper;
