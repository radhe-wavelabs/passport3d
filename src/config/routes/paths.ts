export const
  ROOT = '/',
  /* MEET LINKS APP ROUTES */
  MEETING_PATH = '/:meetingPath',
  /* PASSPORT APP ROUTES */
  NOT_FOUND_PATH = '/404',
  WELCOME_PATH = '/welcome',
  AGENDA_PATH = '/agenda',
  SESSION_PATH = '/session',
  SESSION_MEETING_PATH = '/session/:eventId/meeting/:meetingId',
  AGENDA_MEETING_PATH = '/agenda/:eventId/meeting/:meetingId',
  SHOWCASE_PATH = '/showcase',
  SUPPORT_PATH = '/support',
  REGISTRATION_PATH = '/registration'
;

export const PASSPORT_PATH_LIST = [
  NOT_FOUND_PATH,
  SHOWCASE_PATH,
  AGENDA_PATH, AGENDA_MEETING_PATH,
  SESSION_PATH, SESSION_MEETING_PATH,
  WELCOME_PATH,
  SUPPORT_PATH,
  REGISTRATION_PATH
];
