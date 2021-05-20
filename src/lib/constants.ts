export enum DATE_FORMAT {
  FULL_DATE = 'EEEE, MMMM d yyyy',
  TIME = 'h:mm a'
}

export enum JOIN_STATUS {
  NOT_JOINED = 'NOT_JOINED',
  JOINED_AS_REGISTRANT = 'JOINED_AS_REGISTRANT',
  JOINED_AS_REGULAR = 'JOINED_AS_REGULAR'
}

export enum TIME_RANGES {
  MINUTES_IN_HOUR = 60,
  SECONDS_IN_MINUTE = 60,
  MILLISECONDS_IN_SECOND = 1000,
  MILLISECONDS_IN_HOUR = 3600000,
}

export const ARRAY_INCREMENT_SIZE = 1;
export const COMPARE_INDEX = 1;
export const MAX_TIMEOUT = 2147483647;

export const OE_TEXT_LABEL = 'OpenExchange';
export const OE_LOGO = '/img/OE_Logo.svg';
export const OE_LOGO_ALT_TEXT = `${OE_TEXT_LABEL} Logo`;

export const OE_URL = 'https://www.openexc.com';
export const DEFAULT_COPYRIGHT_TEXT = [ OE_TEXT_LABEL, '©', (new Date()).getFullYear() ].join(' ');

export const PASSCODE_EXPIRATION_DAYS = 7;

export const
  PASSCODE_KEY = 'passcode',
  BYPASS_TOKEN_KEY = 'token',
  ATTENDEE_TOKEN_KEY = 'attendeeToken',
  MEET_PATH_KEY = 'meetingPath',
  MEET_ID_KEY = 'meetingId',
  EVENT_ID_KEY = 'eventId'
;
export const
  MEETING_PATH = 'meeting',
  LIST_PATH = 'list',
  SESSION_PATH = 'session',
  EVENT_PATH = 'event'
;

/* DEFAULTS */
export const
  BACKGROUND_IMG_URL = '/img/OE_Background.jpg',
  PRIMARY_COLOR = '#004e83',
  ERR_MSG = 'Incorrect email address or access code.'
;

/* KNOVIO */
export enum KvEmbedType { SHOWCASE = 'showcase', PRESENTATION = 'presentation' }
export const
  SECURE_PROTO = 'https',
  KNOVIO_URL = 'view.knowledgevision.com',
  SHOWCASE = 'showcase',
  EMBED = 'embed',
  THUMBNAIL = 'thumbnail',
  PRESENTATION = 'presentation',
  EMBEDDED_CONTENT = 'KnowledgeVisionEmbeddedContent'
;

// StringValidators
export const REQUIRED = (v: string): boolean => Boolean(v);
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const MIN6CHAR = (v = '', len = 6): boolean => v.length >= len;
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
export const SHORT_PLAIN_TEXT_LENGTH = (v = '', len = 255): boolean => v.length <= len;
// eslint-disable-next-line
export const EMAIL_REGEXP = (v = ''): boolean => /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(v);
export const SPACE_TRIMMER = (v = ''): string => String.prototype.trim.apply(v);

