import { useParams } from 'react-router';
import { MEET_ID_KEY } from '../lib/constants';

export function useMeetingId(): string {
  return useParams<{[ MEET_ID_KEY ]: string}>()[MEET_ID_KEY];
}
