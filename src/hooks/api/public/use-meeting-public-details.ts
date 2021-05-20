/*
* THIS IS USED BY DirectLinks (MEETLINKS APP);
*/

import { useState } from 'react';
import { HTTP_STATUS, ResponseError } from '../../../config/api';
import { useSWR, responseInterface } from '../../../config/overrides/swr';
import useAttendeeToken from '../../use-attendee-token';
import usePasscodeStore from '../../use-passcode-store';
import useBypassToken from '../../use-bypass-token';
import useMeetingPath from '../../use-meeting-path';
import API, { PublicMeetingDetailsResponseType, PUBLIC } from '../../../lib/api';

const {
  fetchPublicMeetingDetails,
  fetchPublicMeetingDetailsWithBypassToken,
  fetchPublicMeetingDetailsWithAttendeeToken
} = API[PUBLIC];

interface IPublicMeetingInfo {
  data?: PublicMeetingDetailsResponseType;
  error?: ResponseError;
  isLoading?: boolean;
  isValidating?: boolean;
  authorizationType: 'passcode' | 'bypassToken' | 'attendeeToken';
}

export type MeetingDetailsResponse = responseInterface<PublicMeetingDetailsResponseType, ResponseError>

interface MeetingDetailsResponseWithAuthorization extends MeetingDetailsResponse {
  setPasscode(passcode: string): void;
}

const DEFAULT_ERR_MSG = 'Something went wrong';

const checkKeyArgs = (...args: unknown[]) => args.every(Boolean) ? args : null;

export function useMeetingDetailsWithBypassToken(shouldFetch = true): MeetingDetailsResponse {
  const meetingPath = useMeetingPath();
  const bypassToken = useBypassToken();

  const composeKey = () => shouldFetch ? checkKeyArgs(meetingPath, bypassToken) : null;

  const result = useSWR(composeKey, fetchPublicMeetingDetailsWithBypassToken);
  if (!result.isValidating && !result.data && result.error) {
    result.error.message = result.error.status === HTTP_STATUS.NOT_FOUND
      ? 'Passcode token is invalid, please enter passcode'
      : DEFAULT_ERR_MSG;
  }

  return result;
}

function useMeetingDetailsWithAttendeeToken(shouldFetch = true): MeetingDetailsResponse {
  const meetingPath = useMeetingPath();
  const attendeeToken = useAttendeeToken();

  const composeKey = () => shouldFetch ? checkKeyArgs(meetingPath, attendeeToken) : null;

  const result = useSWR(composeKey, fetchPublicMeetingDetailsWithAttendeeToken);
  if (!result.isValidating && !result.data && result.error) {
    result.error.message = result.error.status === HTTP_STATUS.NOT_FOUND
      ? 'Passcode token is invalid, please enter passcode'
      : DEFAULT_ERR_MSG;
  }

  return result;
}

function useMeetingDetailsWithStoredPasscode(shouldFetch = true): MeetingDetailsResponse {
  const meetingPath = useMeetingPath();
  const { getPasscode } = usePasscodeStore();

  const composeKey = () => shouldFetch ? checkKeyArgs(meetingPath, getPasscode()) : null;

  const result = useSWR(composeKey, fetchPublicMeetingDetails);

  if (!result.isValidating && !result.data && result.error) {
    result.error.message = result.error.status === HTTP_STATUS.NOT_FOUND ? '' : DEFAULT_ERR_MSG;
  }

  return result;
}



export function useMeetingDetailsWithPasscode(shouldFetch = true): MeetingDetailsResponseWithAuthorization {
  const [ passcode, setPasscode ] = useState<string>('');
  const meetingPath = useMeetingPath();
  const { storePasscode } = usePasscodeStore();

  const composeKey = () => shouldFetch ? checkKeyArgs(meetingPath, passcode) : null;
  const onSuccess = () => {
    storePasscode(passcode);
  };

  const result = useSWR(composeKey, fetchPublicMeetingDetails, { onSuccess });

  if (!result.isValidating && !result.data && result.error) {
    result.error.message = result.error.status === HTTP_STATUS.NOT_FOUND
      ? 'The passcode you provided is not valid. Please try again'
      : DEFAULT_ERR_MSG
    ;
  }

  return { ...result, setPasscode };
}

/*
* Flow:
* 1. Try to fetch meeting data with AttendeeToken if present the in url
* 1.1 - If success - show meeting details
* 1.2 - If fails - show passcode modal
* 2. Try to fetch meeting data with bypass token if present the in url
* 2.1 - If success - show meeting details
* 2.2 - if fails - try flow 3
* 3. Try to fetch meeting data with the Passcode stored in the Browser Cookies
* 3.1 - if success - show meeting details
* 3.2 - if fails - show passcode modal
* 4. Try to fetch meeting data with the passcode provided by user
* 4.1 - if success - show the meeting details and store the passcode in the Browser Cookies
* 4.2 - if fails - show passcode modal
* */
export default function useMeetingPublicDetails(): IPublicMeetingInfo {
  const noAttendeeToken = !useAttendeeToken();
  const resultByAttendeeToken = useMeetingDetailsWithAttendeeToken();
  const resultByToken = useMeetingDetailsWithBypassToken(noAttendeeToken);
  const shouldFetch = noAttendeeToken && !resultByToken.isValidating && !resultByToken.data;
  const resultByPasscode = useMeetingDetailsWithStoredPasscode(shouldFetch);
  const authorizationType = noAttendeeToken ? resultByToken.data ? 'bypassToken' : 'passcode' : 'attendeeToken';

  return {
    data: noAttendeeToken ? resultByToken.data || resultByPasscode.data : resultByAttendeeToken.data,
    error: noAttendeeToken ? resultByToken.error || resultByPasscode.error : resultByAttendeeToken.error,
    isLoading: noAttendeeToken ? resultByToken.isValidating || resultByPasscode.isValidating : resultByAttendeeToken.isValidating,
    authorizationType
  };
}
