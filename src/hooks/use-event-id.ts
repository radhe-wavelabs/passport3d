import { useParams } from 'react-router';
import { EVENT_ID_KEY } from '../lib/constants';

export function useEventId(): string {
  return useParams<{[ EVENT_ID_KEY ]: string}>()[EVENT_ID_KEY];
}
