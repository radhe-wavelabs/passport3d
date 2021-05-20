import { isMeetLinksProfile } from '../app-config';
import { HTTP_STATUS } from '../config/api';
import { FooterLinkType } from '../lib/api';
import { useEventPublicInfo } from './api/public/use-event-public-details';
import { BACKGROUND_IMG_URL, ERR_MSG, PRIMARY_COLOR } from '../lib/constants';

export interface IEventCustomSettings {
  backgroundFile: string | null,
  primaryColor: string | null,
  footerLinks: (FooterLinkType | void)[],
  loginErrorMessage: string,
  loginInstructions: string | null,
  pageTitle: string,
  customCss: string,
  nonExisted?: boolean
  registrationEnabled?: boolean
}

export function useCustomSettings(): IEventCustomSettings {
  const { data, error, isValidating } = useEventPublicInfo(isMeetLinksProfile());
  const dataOrError = (!isValidating && data) || error;

  if (!dataOrError) {
    return {
      backgroundFile: null,
      primaryColor: null,
      footerLinks: [],
      loginErrorMessage: ERR_MSG,
      loginInstructions: null,
      pageTitle: process.env.REACT_APP_TITLE || '',
      customCss: '',
    };
  }

  /*
  * TODO:
  *  check this:
  * return {
    backgroundFile: dataOrError ? data?.backgroundFile ?? BACKGROUND_IMG_URL : null,
    primaryColor: dataOrError ? data?.primaryColor ?? PRIMARY_COLOR : null,
    footerLinks: dataOrError ? data?.footerLinks ?? [] : [],
    loginErrorMessage: dataOrError ? data?.loginErrorMessage ?? ERR_MSG : ERR_MSG,
    loginInstructions: dataOrError ? data?.loginInstructions ?? null : null,
    pageTitle: dataOrError ? data?.name ?? (process.env.REACT_APP_TITLE || '') : ''
  };
  * */

  return {
    backgroundFile: data?.backgroundFile ?? BACKGROUND_IMG_URL,
    primaryColor: data?.primaryColor ?? PRIMARY_COLOR,
    footerLinks: data?.footerLinks ?? [],
    loginErrorMessage: data?.loginErrorMessage ?? ERR_MSG,
    loginInstructions: data?.loginInstructions || null,
    pageTitle: data?.name || process.env.REACT_APP_TITLE || '',
    customCss: data?.customCss || '',
    nonExisted: error?.status === HTTP_STATUS.NOT_FOUND,
    registrationEnabled: data?.registrationEnabled === true
  };
}
