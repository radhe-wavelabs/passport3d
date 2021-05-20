import React, { createContext, useContext } from 'react';
import { EventPrivateDetailsResponseType } from '../api';
import { useEventPrivateInfo } from '../../hooks/api/protected/use-event-private-details';

export type EventSettingsContextType = EventPrivateDetailsResponseType;

const EventSettingsContext = createContext<EventSettingsContextType | void>(undefined);
export const useEventSettings = (): EventSettingsContextType | void => useContext(EventSettingsContext);

const useEventSettingsProvider = (): EventSettingsContextType | void => {
  const { data } = useEventPrivateInfo();

  return data;
};

type Props = { children: React.ReactNode | React.ReactNodeArray }
export const EventSettingsProvider: React.FunctionComponent<Props> = ({ children }: Props): JSX.Element => {
  const settings = useEventSettingsProvider() as EventSettingsContextType;

  return (
    <EventSettingsContext.Provider value={settings}>
      {children}
    </EventSettingsContext.Provider>
  );
};

export default EventSettingsProvider;
