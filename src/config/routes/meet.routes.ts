import { ROOT, MEETING_PATH } from './paths';
import MeetingDetailsWrapper from '../../app/meet-links/meeting-details-wrapper';
import { RoutesConfig } from './index';


const routes: RoutesConfig = {
  [ ROOT ]: { exact: true },
  [ MEETING_PATH ]: { component: MeetingDetailsWrapper }
};

export default routes;
