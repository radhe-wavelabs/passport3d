import * as protectedApi from './protected/index';
import * as publicApi from './public/index';


/* API KEY */
export const PUBLIC = 'PUBLIC', PROTECTED = 'PROTECTED';

/* URL PATH KEYS */
export const
  EVENT = 'event',
  MEETING = 'meeting',
  SESSION = 'session',
  LIST = 'list',
  ATTENDEE = 'attendee',
  INFO = 'info',
  JOIN_MEETING = 'join',
  RESEND_CODE = 'resend-code',
  ATTEND = 'attend',
  LEAVE = 'leave',
  TRACK = 'track',
  REGISTER = 'register'
;


/* MEETING ATTENDEE */
type MeetingAttendeeDetailsType = {
  attendeeId: number,
  firstName: string,
  lastName: string,
  title: string
}
export type MeetingAttendeeDetailsListType = Array<MeetingAttendeeDetailsType>;


/* MEETINGS ORGANIZATION */
type MeetingOrganizationDetailsType = {
  name: string,
  organizationId: number,
  attendees?: MeetingAttendeeDetailsListType
}
export type MeetingOrganizationDetailsListType = Array<MeetingOrganizationDetailsType>;


/* MEETING DETAILS */
type MeetingDetailsType = {
  startDateTime: string,
  endDateTime: string,
  topic: string,
  type: string,
  access: string,
  track: string,
  notes: string,
  connectionDetails?: string,
  meetingId: string,
  attendeeLink?: string,
  showcasePagePath?: string,
  connectionLink?: string,
  connectionDefined: boolean,
  embedCodeId?: string,
  meetingInvitation?: string
}

export type PublicMeetingDetailsResponseType = {
  timeZone: string,
  eventEndDateTime: string,
  eventStartDateTime: string,
  eventName: string
} & MeetingDetailsType;

type PublicMeetingDetailsList = Array<PublicMeetingDetailsResponseType>;

export type MeetingDetailsListResponseType = {
  futureMeetings: PublicMeetingDetailsList,
  pastMeetings: PublicMeetingDetailsList
}

export type PrivateMeetingDetailsResponseType = {
  presenterOrganizations?: MeetingOrganizationDetailsListType,
  participantOrganizations?: MeetingOrganizationDetailsListType,
  hostOrganizations?: MeetingOrganizationDetailsListType
} & MeetingDetailsType;


/* MEETING SESSION */
export type PrivateMeetingSessionDetailsResponseType = {
  access: string,
  joinStatus?: string,
} & PrivateMeetingDetailsResponseType;
export type PrivateMeetingSessionDetailsListResponseType = Array<PrivateMeetingSessionDetailsResponseType>;


/* CURRENT USER */
export type CurrentUserResponseType = {
  email: string,
  firstName: string | null,
  lastName: string | null,
  attendeeId: number,
  title: string | null,
  externalAttendeeId: number | null,
  eventId: number,
  organizationId: number | null,
  externalOrganizationId: number | null,
  organizationName: string | null,
};


/* EVENT SETTINGS */

export type FooterLinkType = {
  order: number,
  label: string,
  url: string
}
export type FooterLinkListType = Array<FooterLinkType>;

type EventPublicSettingsType = {
  logoUrl?: string,
  logoTitle?: string,
  backgroundFile?: string,
  primaryColor?: string,
  loginErrorMessage?: string,
  loginInstructions?: string,
  footerLinks: FooterLinkListType
}

type EventPrivateSettingsType = {
  /* LANDING PAGE */
  landingPage?: string

  /* SHOWCASE */
  showcaseEnabled: boolean,
  showcaseLabel?: string,
  showcaseEmbedId?: string,
  showcaseLinkDescription?: string,

  /* WELCOME PAGE */
  welcomeEnabled: boolean,
  welcomeLabel?: string;

  /* WELCOME KNOVIO */
  welcomeKnovioEnabled: boolean,
  welcomeKnovioEmbedId?: string,

  /* PREVENT JOIN MEETING */
  preventJoinEnabled: boolean,
  preventJoinBefore?: number,

  /* SUPPORT PAGE */
  supportInformation?: string,
  supportLabel?: string,
  supportEnabled: boolean,

  /* AGENDA PAGE */
  agendaEnabled: boolean;
  agendaLabel?: string,
  agendaLinkDescription?: string,

  /* SESSION PAGE */
  sessionEnabled: boolean,
  sessionLinkDescription?: string,
  sessionLabel?: string
}

/* EVENT DETAILS */
export type EventPublicDetailsResponseType = {
  eventId: number,
  name: string,
  subdomain: string,
  publicDescription: string,
  startTime: string,
  endTime: string,
  timeZone: string,
  customCss: string,
  registrationEnabled: boolean
} & EventPublicSettingsType;

export type EventPrivateDetailsResponseType = {
  privateDescription?: string
} & EventPrivateSettingsType & EventPublicDetailsResponseType;

/* TRACKING DATA EVENT */
export enum EventType { PAGE_VIEW = 'pageView', USER_ACTION = 'userAction' }
export enum EventAction { NAVIGATE = 'navigate', CLICK = 'click' }
export type MetadataType = {
  meetingId?: string,
  from?: string,
  source?: string,
  page?: string,
  href?: string,
  label?: string,
  name?: string,
  container?: string,
  tagName?: string
}
export type TrackingDataEventType = {
  type: EventType,
  action: EventAction,
  generatedDateTime: string,
  label?: string,
  value: string,
  metadata: MetadataType
}

export default {
  get [PROTECTED](): typeof protectedApi { return protectedApi; },
  get [PUBLIC](): typeof publicApi{ return publicApi; }
};

