import { NavLink } from 'react-router-dom';
import { AGENDA_PATH, SHOWCASE_PATH, SUPPORT_PATH, WELCOME_PATH, SESSION_PATH } from '../config/routes/paths';
import { EventPrivateDetailsResponseType } from '../lib/api';
import { useEventSettings, EventSettingsContextType } from '../lib/context-providers/event-settings-context';
import { truncateString } from '../lib/helpers/text-formatters';

const ITEMS_ORDERED = [ WELCOME_PATH, AGENDA_PATH, SESSION_PATH, SHOWCASE_PATH, SUPPORT_PATH ];
export const MIN_DESKTOP_LABEL_LENGTH = 10;
export const MAX_DESKTOP_LABEL_LENGTH = 60;

export type ConfigItemType = {
  className?: string;
  activeClassName?: string;
  to: string;
  label: string;
  tooltipPosition?: string;
  tooltip ?: string;
} & Partial<NavLink>;

/**
 * Compose NavItem base config (props)
 */
export const getConfigByPath = (path: string, data: EventPrivateDetailsResponseType): ConfigItemType | null => {
  const to = path;
  switch (path) {
  case WELCOME_PATH:
    return data.welcomeEnabled ? { to, label: data.welcomeLabel || 'Welcome' } : null;
  case AGENDA_PATH:
    return data.agendaEnabled ? { to, label: data.agendaLabel || 'My Schedule' } : null;
  case SESSION_PATH:
    return data.sessionEnabled ? { to, label: data.sessionLabel || 'General session' } : null;
  case SHOWCASE_PATH:
    return data.showcaseEnabled ? { to, label: data.showcaseLabel || 'Showcase' } : null;
  case SUPPORT_PATH:
    return data.supportEnabled ? { to, label: data.supportLabel || 'Support' } : null;
  default:
    return null;
  }
};


type EnhancerType<T> = (item: T) => T;

export const addItemLabelTooltip: EnhancerType<ConfigItemType> = (item, position = 'bottom') => {
  return item ? { ...item, 'data-tooltip': item.label, 'data-tooltip-position': position } : item;
};

export const truncateDesktopLabel = (label: string): string => truncateString(label, MAX_DESKTOP_LABEL_LENGTH);

export const truncateItemLabel: EnhancerType<ConfigItemType> = (item): ConfigItemType => {
  return item ? { ...item, label: truncateDesktopLabel(item.label) } : item;
};

// add tooltip to the label with length > 10 chars
export const applyDesktopTooltipEnhancer: EnhancerType<ConfigItemType | null> = (item) => {
  return item && item.label.length > MIN_DESKTOP_LABEL_LENGTH ? addItemLabelTooltip(item) : item;
};

// truncate label with length more than 60 chars
export const applyDesktopTruncateEnhancer: EnhancerType<ConfigItemType | null> = (item) => {
  return item && item.label.length > MAX_DESKTOP_LABEL_LENGTH ? truncateItemLabel(item) : item;
};

export const composeNavItems = (keys: string[] = ITEMS_ORDERED, cnf?: EventPrivateDetailsResponseType): ConfigItemType[] | null => {
  if (!cnf) return null;

  return keys.reduce((items, key) => {
    const item = getConfigByPath(key, cnf);

    return item ? [ ...items, item ] : items;
  }, [] as ConfigItemType[]);
};


export default function useNavBarItemsConfig(isDesktop: boolean | void): ConfigItemType[] | null {
  const eventSettings = useEventSettings() as EventSettingsContextType;
  if (!eventSettings) return null;

  const items = composeNavItems(ITEMS_ORDERED, eventSettings);
  
  if (isDesktop && items) {
    return items
      // add tooltips
      .map(applyDesktopTooltipEnhancer)
      // truncate labels
      .map(applyDesktopTruncateEnhancer) as ConfigItemType[]
    ;
  }

  return items;
}
