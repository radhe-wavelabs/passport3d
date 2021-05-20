import { useParams } from 'react-router';
import { MEET_PATH_KEY } from '../lib/constants';

export default function useMeetingPath(): string {
  return useParams<{[ MEET_PATH_KEY ]: string}>()[MEET_PATH_KEY];
}
