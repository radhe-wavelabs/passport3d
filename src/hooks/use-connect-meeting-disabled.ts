import { TIME_RANGES } from '../lib/constants';
import { useEffect, useState } from 'react';
import { EventPrivateDetailsResponseType } from '../lib/api';
import { MAX_TIMEOUT } from '../lib/constants';

const useConnectMeetingDisabled = (eventInfo?: EventPrivateDetailsResponseType, startDateTime?: string): boolean => {
  const [isConnectBtnDisabled, setIsConnectBtnDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (!eventInfo || !startDateTime) return;
    const startDate = new Date(startDateTime);
    const { preventJoinEnabled, preventJoinBefore } = eventInfo;
    if (!preventJoinEnabled || !preventJoinBefore) {
      setIsConnectBtnDisabled(false);
      return;
    } else {
      const preventJoinBeforeInMs = preventJoinBefore * TIME_RANGES.SECONDS_IN_MINUTE * TIME_RANGES.MILLISECONDS_IN_SECOND;
      const msToConnectBtnEnabled = startDate.getTime() - new Date().getTime() - preventJoinBeforeInMs;
      if (msToConnectBtnEnabled <= 0) {
        setIsConnectBtnDisabled(false);
      } else if (msToConnectBtnEnabled >=MAX_TIMEOUT) {
        setIsConnectBtnDisabled(true);
      } else {
        const id = setTimeout(() => {
          setIsConnectBtnDisabled(false);
        }, msToConnectBtnEnabled);
        return () => clearTimeout(id);
      }
    }
  }, [eventInfo, startDateTime]);

  return isConnectBtnDisabled;
};

export default useConnectMeetingDisabled;
