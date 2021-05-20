import { ATTENDEE_TOKEN_KEY, BYPASS_TOKEN_KEY } from '../../../constants';
import { ATTENDEE, EVENT, MEETING, RESEND_CODE } from '../../index';
import {
  fetchPublicMeetingDetails,
  fetchPublicMeetingDetailsWithBypassToken,
  fetchPublicEventDetailsBySubdomain,
  composePublicUrl,
  fetchPublicMeetingDetailsWithAttendeeToken, requestAccessCode,
} from '../index';

import { Payload, RequestHeaders } from '../../../../config/api';

const mockGetReqMethod = jest.fn();
const mockPostReqMethod = jest.fn();
jest.mock('../../../../config/overrides/api', () => ({
  publicApiClient: {
    'GET': (url: string, reqInit: RequestInit) => reqInit ? mockGetReqMethod(url, reqInit) : mockGetReqMethod(url),
    'POST': (url: string, data?: Payload) => data ? mockPostReqMethod(url, data) : mockPostReqMethod(url),
  }
}));

describe('Public API should use appropriate Api Client', () => {
  const
    meetingPath = 'meet_path', passcode = '123456', token = 'bypass_token', subdomain = 'some.domain',
    encoded_passcode = btoa(passcode), attendeeToken = 'attendee_token', eventId = 'event_id', email = 'mail@test.com'
  ;

  beforeEach(() => {
    mockGetReqMethod.mockClear();
    mockPostReqMethod.mockClear();
  });

  it(`${fetchPublicMeetingDetails.name}`, async () => {
    const reqInit = { headers: { [RequestHeaders.Passcode]: encoded_passcode }};
    await fetchPublicMeetingDetails(meetingPath, passcode);
    expect(mockGetReqMethod).toHaveBeenCalledWith(composePublicUrl(MEETING, meetingPath), reqInit);
  });
  it(`${fetchPublicMeetingDetailsWithBypassToken.name}`, async () => {
    await fetchPublicMeetingDetailsWithBypassToken(meetingPath, token);
    expect(mockGetReqMethod).toHaveBeenCalledWith(`${composePublicUrl(MEETING, meetingPath)}?${BYPASS_TOKEN_KEY}=${token}`);
  });
  it(`${fetchPublicMeetingDetailsWithAttendeeToken.name}`, async () => {
    await fetchPublicMeetingDetailsWithAttendeeToken(meetingPath, attendeeToken);
    expect(mockGetReqMethod).toHaveBeenCalledWith(`${composePublicUrl(MEETING, meetingPath)}?${ATTENDEE_TOKEN_KEY}=${attendeeToken}`);
  });
  it(`${fetchPublicEventDetailsBySubdomain.name}`, async () => {
    await fetchPublicEventDetailsBySubdomain(subdomain);
    expect(mockGetReqMethod).toHaveBeenCalledWith(composePublicUrl(EVENT, subdomain));
  });
  it(`${requestAccessCode.name}`, async () => {
    await requestAccessCode(eventId, email);
    expect(mockPostReqMethod).toHaveBeenCalledWith(composePublicUrl(EVENT, eventId, ATTENDEE, RESEND_CODE), { email });
  });
});
