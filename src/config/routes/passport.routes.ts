import { RoutesConfig } from './index';
import {
  NOT_FOUND_PATH,
  ROOT,
  WELCOME_PATH,
  AGENDA_PATH,
  SESSION_PATH,
  SESSION_MEETING_PATH,
  AGENDA_MEETING_PATH,
  SHOWCASE_PATH,
  SUPPORT_PATH,
  REGISTRATION_PATH
} from './paths';
import { PassportPlaceholder } from '../../app/passport/PassportPlaceholder';
import NotFoundPage from '../../app/passport/404';
import Welcome from '../../app/passport/WelcomeWrapper/WelcomeWrapper';
import AgendaWrapper from '../../app/passport/AgendaWrapper/AgendaWrapper';
import SessionWrapper from '../../app/passport/SessionWrapper/SessionWrapper';
import MeetingWrapper from '../../app/passport/MeetingWrapper/MeetingWrapper';
import ShowcaseWrapper from '../../app/passport/ShowcaseWrapper';
import SupportPageWrapper from "../../app/passport/SupportPageWrapper/SupportPageWrapper";
import { RegistrationPage } from '../../app/passport/RegistrationPage';

const routes: RoutesConfig = {
  [ROOT]: { exact: true, component: PassportPlaceholder },
  [WELCOME_PATH]: { component: Welcome, _protected: true },
  [AGENDA_PATH]: { exact: true, component: AgendaWrapper, _protected: true },
  [SESSION_PATH]: { exact: true, component: SessionWrapper, _protected: true },
  [SESSION_MEETING_PATH]: { component: MeetingWrapper, _protected: true },
  [AGENDA_MEETING_PATH]: { component: MeetingWrapper, _protected: true },
  [SHOWCASE_PATH]: { component: ShowcaseWrapper, _protected: true },
  [SUPPORT_PATH]: { component: SupportPageWrapper, _protected: true },
  [NOT_FOUND_PATH]: { component: NotFoundPage },
  [REGISTRATION_PATH]: { exact: true, component: RegistrationPage, _public: true },
};
export default routes;
