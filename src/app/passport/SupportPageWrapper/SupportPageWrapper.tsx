import React from 'react';
import { Redirect } from 'react-router-dom';
import { useEventPrivateInfo } from "../../../hooks/api/protected/use-event-private-details";
import useDefaultRoutePage from '../../../hooks/use-default-route-page';
import EventDetails from "../../shared/EventDetails";
import SupportPageInfo from "./SupportPageInfo";

const SupportPageWrapper: React.FC = (): JSX.Element | null => {
  const { data } = useEventPrivateInfo();
  const landingPage = useDefaultRoutePage();
  
  if (data && !data?.supportEnabled) {
    return <Redirect to={landingPage} />;
  }

  if (data?.supportInformation) return (
    <>
      <EventDetails details={data}/>
      <SupportPageInfo
        supportLabel={data?.supportLabel || 'Support'}
        supportInformation={data?.supportInformation || ''}
      />
    </>
  );
  return null;
};

export default SupportPageWrapper;
