import { getUrlQueryArgByKey } from '../lib/api/utils';
import { ATTENDEE_TOKEN_KEY } from '../lib/constants';

export default function useAttendeeToken(): string | null {
  return getUrlQueryArgByKey(ATTENDEE_TOKEN_KEY);
}
