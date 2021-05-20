import { Payload } from '../../../../config/api';
import { ATTEND, EVENT, EventType, LEAVE, MEETING, TRACK, TrackingDataEventType } from '../../index';
import { composeUrl } from '../../utils';
import * as API from '../index';


const mockGetReqMethod = jest.fn();
const mockPostReqMethod = jest.fn();
const mockDeleteReqMethod = jest.fn();
jest.mock('../../../../config/overrides/api', () => ({
  protectedApiClient: {
    'GET': (url: string) => mockGetReqMethod(url),
    'POST': (url: string, data?: Payload) => data ? mockPostReqMethod(url, data) : mockPostReqMethod(url),
    'DELETE': (url: string) => mockDeleteReqMethod(url)
  }
}));


describe('Protected API should use appropriate Api Client', () => {
  const eventId = 'eventId', meetingId = 'meetingId';

  beforeEach(() => {
    mockGetReqMethod.mockClear();
    mockDeleteReqMethod.mockClear();
    mockPostReqMethod.mockClear();
  });

  [
    API.fetchCurrentUserInfo, API.fetchMeetingPrivateSessionList, API.fetchEventPrivateMeetingList,
    API.fetchEventPrivateDetails, API.fetchMeetingPrivateDetails
  ]
    .forEach((method, i) => {
      const arg = String(i);
      it(`${method.name}`, async () => {
        await method(arg);
        expect(mockGetReqMethod).toHaveBeenCalledWith(composeUrl(arg));
      });
    });

  it(`${API.attendMeeting.name}`, async () => {
    await API.attendMeeting(eventId, meetingId);
    expect(mockPostReqMethod).toHaveBeenCalledWith(composeUrl(EVENT, eventId, MEETING, meetingId, ATTEND));
  });
  it(`${API.leaveMeeting.name}`, async () => {
    await API.leaveMeeting(eventId, meetingId);
    expect(mockDeleteReqMethod).toHaveBeenCalledWith(composeUrl(EVENT, eventId, MEETING, meetingId, LEAVE));
  });
  it(`${API.sendTrackingData.name}`, async () => {
    const data: Partial<TrackingDataEventType> = {
      type: EventType.USER_ACTION,
      generatedDateTime: (new Date()).toISOString()
    };
    await API.sendTrackingData(data as TrackingDataEventType);
    expect(mockPostReqMethod).toHaveBeenCalledWith(composeUrl(TRACK), data);
  });


});
