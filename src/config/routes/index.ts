/*eslint-disable @typescript-eslint/no-var-requires*/
import { RouteProps } from 'react-router-dom';
import { isPassportProfile, isMeetLinksProfile } from '../../app-config';

export type RoutesConfig = Record<string, RouteProps & { _protected?: boolean, _public?: boolean }>;


export default (() => {
  if (isPassportProfile()) return require('./passport.routes').default;
  if (isMeetLinksProfile()) return require('./meet.routes').default;
})();
