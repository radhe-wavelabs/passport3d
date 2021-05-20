import useMeetingPath from '../use-meeting-path';
import { MEET_PATH_KEY } from '../../lib/constants';


jest.mock('react-router', () => ({
  useParams: () => ({
    'meetingPath': 'mockMeetPath'
  })
}));
describe('useMeetingPath', () => {
  it(`should return meeting path by calling useParams for parsing ${MEET_PATH_KEY}`, () => {
    expect(useMeetingPath()).toEqual('mockMeetPath');
  });
});
