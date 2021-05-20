import { PageViewEvent } from '../PageViewEvent';

describe('PageViewEvent', () => {
  const meetingUrl = '/agenda/event/1/meeting/1';
  const _event = new PageViewEvent(meetingUrl);
  it('should return value as current url', () => {
    expect(_event.value).toEqual(meetingUrl);
  });
  it('should return meeting id as part of metadata or an empty string if no meeting in the url', () => {
    expect(_event.metadata.meetingId).toEqual('1');
    expect((new PageViewEvent('/agenda').metadata.meetingId)).toEqual('');
  });
  it('should use current url if no provided', () => {
    const getPathNameMock = jest.spyOn(PageViewEvent, 'getPathName');
    getPathNameMock.mockImplementation(() => meetingUrl);

    const _event2 = new PageViewEvent();

    expect(_event2.value).toEqual(meetingUrl);
    expect(_event2.metadata.meetingId).toEqual('1');
  });

  it('should getMeetingId from the current url if not provided', () => {
    expect(PageViewEvent.getMeetingId()).toEqual('1');
  });
});
