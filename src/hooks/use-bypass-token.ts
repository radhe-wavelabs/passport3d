import { getUrlQueryArgByKey } from '../lib/api/utils';
import { BYPASS_TOKEN_KEY } from '../lib/constants';

export default function useBypassToken(): string | null {
  return getUrlQueryArgByKey(BYPASS_TOKEN_KEY);
}

