import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useEventPrivateInfo } from '../../../hooks/api/protected/use-event-private-details';
import EventDetails from '../../shared/EventDetails';
import SessionMeetingsList from './SessionMeetingsList';
import useDefaultRoutePage from '../../../hooks/use-default-route-page';

const SessionWrapper: React.FC = () => {
  const { isValidating, data } = useEventPrivateInfo();
  const landingPage = useDefaultRoutePage();

  if (data && !data?.sessionEnabled) {
    return <Redirect to={landingPage} />;
  }
  if (!isValidating && data) return (
    <>
      <EventDetails details={data}/>
      <SessionMeetingsList event={data}/>
    </>
  );
  return null;
};

export default SessionWrapper;
