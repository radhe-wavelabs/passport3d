import { useEventSettings, EventSettingsContextType } from '../lib/context-providers/event-settings-context';

export default function useDefaultRoutePage(): string {
  const eventSettings = useEventSettings() as EventSettingsContextType;
  if (eventSettings) {
    return `/${eventSettings.landingPage}`;
  }
  return '';
}
