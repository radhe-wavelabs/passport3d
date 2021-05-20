import { PASSPORT_PATH_LIST } from '../config/routes/paths';
import { useRouteMatch } from 'react-router-dom';

export default function useCurrentRoutePath(): string | void {
  return PASSPORT_PATH_LIST.find(useRouteMatch);
}
