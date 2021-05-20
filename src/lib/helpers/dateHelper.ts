import { format, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

const localShortDateFormatterOptions = {
  weekday: 'long',
  month: 'numeric',
  day: 'numeric'
};
const localShortDateWithYearFormatterOptions = {
  ...localShortDateFormatterOptions,
  year: 'numeric'
};
const localFullDateFormatterOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
const localTimeFormatterOptions = {
  hour: 'numeric',
  minute: 'numeric',
  hour12: !!(new Date().toLocaleTimeString().match(/am|pm/i))
};

const defaultLocalRegion = 'default';
const enUsRegion = 'en-us';

export const getCurrentTimezone = ():string => Intl.DateTimeFormat().resolvedOptions().timeZone;

export const getFullDateInLocalFormat = (date: string | Date, timezone: string): string => {
  return utcToZonedTime(date, timezone).toLocaleDateString(defaultLocalRegion, localFullDateFormatterOptions);
};
export const getShortDateInLocalFormat = (date: Date, timezone: string): string => {
  return utcToZonedTime(zonedTimeToUtc(date, timezone), timezone).toLocaleDateString(defaultLocalRegion, localShortDateFormatterOptions);
};
export const getShortDateWithYearInLocalFormat = (date: string | Date, timezone: string): string => {
  return utcToZonedTime(date, timezone).toLocaleDateString(enUsRegion, localShortDateWithYearFormatterOptions);
};

export const getTimeInLocalFormat = (date: string | Date, timezone: string): string => {
  return utcToZonedTime(date, timezone).toLocaleTimeString(defaultLocalRegion, localTimeFormatterOptions);
};

export const getFormatTimezone = (dateTime: Date, timeZone?: string):string => {
  //Get timezone in +00 format
  const formatRegex = /^[+-][0]/;
  const timeZoneShort = timeZone ? format(dateTime,'xxx' ,{ timeZone }) : format(dateTime,'xxx' );
  //Remove trailing zero and negative sign
  const formattedTimezone = timeZoneShort.replace(formatRegex, `${timeZoneShort[0]}`);
  return `GMT ${formattedTimezone}`;
};

/**
 * Return current DateTime in ISO without ms
 */
export const getDateTimeIsoOmitMs = (): string => (new Date()).toISOString().split('.')[0] + 'Z';
