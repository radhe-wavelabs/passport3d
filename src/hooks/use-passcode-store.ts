import Cookies from 'js-cookie';
import useMeetingPath from './use-meeting-path';
import { PASSCODE_KEY, PASSCODE_EXPIRATION_DAYS } from '../lib/constants';

type PasscodeCookieStore = {
  getPasscode(): string | undefined,
  storePasscode(value: string): void
}

export default function usePasscodeStore(): PasscodeCookieStore {
  const expires = PASSCODE_EXPIRATION_DAYS;
  const path = `/${useMeetingPath()}`;

  return {
    getPasscode() {
      return Cookies.get(PASSCODE_KEY);
    },
    storePasscode(passcodeValue) {
      Cookies.set(PASSCODE_KEY, passcodeValue, { expires, path });
    }
  };
}
