import React from 'react';
import { Redirect, RouteProps } from 'react-router-dom';
import useDefaultRoutePage from '../../../hooks/use-default-route-page';
import { EventSettingsContextType, useEventSettings } from '../../../lib/context-providers/event-settings-context';
import { EmbedContainer } from '../../../lib/kv-embed';

type ShowcaseWrapperProps = {
  location: {
    state: { showcasePagePath: string } | null
  } & Partial<RouteProps>
};

const ShowcaseWrapper: React.FC<ShowcaseWrapperProps> = ({ location }: ShowcaseWrapperProps): JSX.Element | null => {
  const pagePath = location?.state?.showcasePagePath ?? '';
  const eventSettings = useEventSettings() as EventSettingsContextType;
  const landingPage = useDefaultRoutePage();

  if (!eventSettings) return null;

  if (!eventSettings.showcaseEnabled) {
    return <Redirect to={landingPage} />;
  }

  const embedId = eventSettings.showcaseEmbedId || null;

  return <EmbedContainer.Showcase embedId={embedId} pagePath={pagePath}/>;
};

export default ShowcaseWrapper;
