import { RequestHeaders, ResponseResultType } from '../../../config/api';
import { publicApiClient } from '../../../config/overrides/api';
import { composeUrl } from '../utils';
import {
  MEETING, EVENT, ATTENDEE, RESEND_CODE, REGISTER,
  EventPublicDetailsResponseType, PublicMeetingDetailsResponseType,
} from '../index';
import { ATTENDEE_TOKEN_KEY, BYPASS_TOKEN_KEY } from '../../constants';

const API_PREFIX = 'public';
export const composePublicUrl = (...args: string[]): string => composeUrl(API_PREFIX, ...args);

export function fetchPublicMeetingDetails(meetingPath: string, passcode: string): ResponseResultType<PublicMeetingDetailsResponseType> {
  return publicApiClient.GET(composePublicUrl(MEETING, meetingPath), { headers: { [RequestHeaders.Passcode]: btoa(passcode) }});
}

export function fetchPublicMeetingDetailsWithBypassToken(meetingPath: string, bypassToken: string): ResponseResultType<PublicMeetingDetailsResponseType> {
  return publicApiClient.GET(`${composePublicUrl(MEETING, meetingPath)}?${BYPASS_TOKEN_KEY}=${bypassToken}`);
}

export function fetchPublicMeetingDetailsWithAttendeeToken(meetingPath: string, attendeeToken: string): ResponseResultType<PublicMeetingDetailsResponseType> {
  return publicApiClient.GET(`${composeUrl(API_PREFIX, MEETING, meetingPath)}?${ATTENDEE_TOKEN_KEY}=${attendeeToken}`);
}

export function fetchPublicEventDetailsBySubdomain(subdomain: string): ResponseResultType<EventPublicDetailsResponseType> {
  return publicApiClient.GET(composePublicUrl(EVENT, subdomain));
}

export function requestAccessCode(eventId: string, email: string): Promise<void> {
  return publicApiClient.POST(composePublicUrl(EVENT, eventId, ATTENDEE, RESEND_CODE), { email });
}

export function registerAttendee(eventId: string, params: Record<string, unknown>): Promise<void> {
  return publicApiClient.POST(composePublicUrl(EVENT, eventId, ATTENDEE, REGISTER), { ...params });
}

