import { AGENDA_PATH, SESSION_PATH } from '../../../config/routes/paths';
import { EventAction, EventType, MetadataType } from '../../api';
import { getDateTimeIsoOmitMs } from '../../helpers/dateHelper';

const MEETING_KEY = 'meeting';

export class PageViewEvent {

  static getMeetingId = (urlPath: string = PageViewEvent.getPathName()): string => {
    if ([AGENDA_PATH, SESSION_PATH].some(path => urlPath.startsWith(path)) && urlPath.includes(MEETING_KEY)) {
      const urlPathParts = urlPath.split('/');
      const meetingIdx = urlPathParts.indexOf(MEETING_KEY);

      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      return meetingIdx > -1 ? urlPathParts[meetingIdx + 1] : '';
    }
    return '';
  }

  public readonly type: EventType = EventType.PAGE_VIEW;
  public readonly action: EventAction = EventAction.NAVIGATE
  public readonly label: string = '';
  public readonly generatedDateTime: string;
  public readonly value: string;
  public readonly metadata: MetadataType;

  static getPathName = (): string => window.location.pathname;

  constructor(url: string = PageViewEvent.getPathName()) {
    this.value = url;
    this.metadata = {
      source: PageViewEvent.getPathName(),
      meetingId: PageViewEvent.getMeetingId(url)
    };
    this.generatedDateTime = getDateTimeIsoOmitMs();
  }
}

