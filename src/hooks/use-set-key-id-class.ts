import { 
  SHOWCASE_PATH, 
  ROOT,
  AGENDA_PATH,
  SESSION_PATH,
  WELCOME_PATH,
  SUPPORT_PATH,
  NOT_FOUND_PATH
} from '../config/routes/paths';
import { getPathName } from '../lib/helpers/text-formatters';

export default function useSetKeyIdClass(): string {
  const pathname = window.location.pathname;
  let key = '';
  const paths = [
    SHOWCASE_PATH, 
    ROOT, 
    AGENDA_PATH, 
    SESSION_PATH, 
    WELCOME_PATH, 
    SUPPORT_PATH,
  ];
  if(NOT_FOUND_PATH === pathname) {
    return 'not-found';
  }
  if(paths.includes(pathname)) {
    key = getPathName(pathname);
  }
  return key;
}