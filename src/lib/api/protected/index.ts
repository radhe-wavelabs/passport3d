import { ResponseResultType } from '../../../config/api';
import { composeUrl } from '../utils';
import { protectedApiClient } from '../../../config/overrides/api';
import {
  PrivateMeetingSessionDetailsListResponseType, PrivateMeetingDetailsResponseType, EventPrivateDetailsResponseType,
  CurrentUserResponseType, MeetingDetailsListResponseType, EVENT, MEETING, ATTEND, LEAVE, TRACK, TrackingDataEventType,
} from '../index';

export function fetchEventPrivateDetails(...args: string[]): ResponseResultType<EventPrivateDetailsResponseType> {
  return protectedApiClient.GET(composeUrl(...args));
}

export function fetchMeetingPrivateDetails(...args: string[]): ResponseResultType<PrivateMeetingDetailsResponseType> {
  return protectedApiClient.GET(composeUrl(...args));
}

export function fetchEventPrivateMeetingList(...args: string[]): ResponseResultType<MeetingDetailsListResponseType> {
  return protectedApiClient.GET(composeUrl(...args));
}

export function fetchMeetingPrivateSessionList(...args: string[]): ResponseResultType<PrivateMeetingSessionDetailsListResponseType> {
  return protectedApiClient.GET(composeUrl(...args));
}

export function fetchCurrentUserInfo(...args: string[]): ResponseResultType<CurrentUserResponseType> {
  return protectedApiClient.GET(composeUrl(...args));
}

export async function attendMeeting(eventId: string, meetingId: string): Promise<void> {
  return protectedApiClient.POST(composeUrl(EVENT, eventId, MEETING, meetingId, ATTEND));
}
export async function leaveMeeting(eventId: string, meetingId: string): Promise<void> {
  return protectedApiClient.DELETE(composeUrl(EVENT, eventId, MEETING, meetingId, LEAVE));
}

export async function sendTrackingData(data: TrackingDataEventType): Promise<void> {
  return protectedApiClient.POST(composeUrl(TRACK), data);
}
