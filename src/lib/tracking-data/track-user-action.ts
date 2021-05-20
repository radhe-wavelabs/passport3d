import { Auth } from 'aws-amplify';
import { isPassportProfile } from '../../app-config';
import { RefObject, useEffect, useRef } from 'react';
import { MetadataType } from '../api';
import { storeUserAction, trackUserAction, TrackUserActionType, StoreUserActionType, getSoredUserActions } from './index';


const trackingEnabled = isPassportProfile();

/* ROOT CONTAINERS */
const HEADER = 'header', MAIN = 'main', FOOTER = 'footer';

/* TRACKING EVENT */
const CLICK = 'click';

/* TARGET ELEMENTS FOR ADDING TRACKING EVENT HANDLERS */
const LINK = 'a', BUTTON = 'button';

const rootEl = document.getElementById('root');
const CONTAINER_LIST = [ HEADER, MAIN, FOOTER ];

export type RefObjectHTML = RefObject<HTMLButtonElement & HTMLAnchorElement>
export type UserActionTrackingProps = { ref: RefObjectHTML };
export type DomAttrParser = (elRef: HTMLElement | null) => string | null;

export const getElementTagName: DomAttrParser = ref => ref?.tagName?.toLowerCase?.() ?? null;
export const getElementRootTagName: DomAttrParser = ref => CONTAINER_LIST.find(tag => rootEl?.querySelector?.(tag)?.contains(ref)) ?? null;
export const getElementContainerTagName: DomAttrParser = ref => getElementRootTagName(ref);

export type TrackingAttrsType = {value: string, elementType: string} & Partial<MetadataType>;
export const getTrackingAttrs = (ref: HTMLButtonElement | HTMLAnchorElement | null): TrackingAttrsType | null => {
  switch (getElementTagName(ref)) {
  case BUTTON:
    return {
      elementType: 'button',
      name: ref?.name ?? '',
      meetingId: ref?.dataset?.meetingId,
      value: ref?.innerText ?? '',
      label: getElementContainerTagName(ref) ?? ''
    };
  case LINK:
    return {
      elementType: 'link',
      value: ref?.innerText ?? '',
      href: ref?.getAttribute?.('href') ?? '',
      label: getElementContainerTagName(ref) ?? ''
    };
  default:
    return null;
  }
};

export function eventHandler(e: MouseEvent, ref: RefObjectHTML, cb?: TrackUserActionType | StoreUserActionType): void {
  const { current } = ref;
  const attrs = getTrackingAttrs(current);
  if (!attrs) return;

  const { value, label, ...metadata } = attrs;

  if (cb) cb(value, metadata, label);
}

export const bindTrackingEventListener = (ref: RefObjectHTML, cb?: TrackUserActionType | StoreUserActionType): (() => void) | void => {
  if (ref.current) {
    const handler = (e: MouseEvent) => eventHandler(e, ref, cb);

    ref.current.addEventListener(CLICK, handler);
    return () => ref.current?.removeEventListener?.(CLICK, handler);
  }
};

const auth = {
  isAuthenticated: false
};

async function checkIsAuthenticated(): Promise<void> {
  try {
    await Auth.currentSession();
    auth.isAuthenticated = true;
  } catch {
    auth.isAuthenticated = false;
  }
}

export const useUserActionTracking = () : { ref: RefObjectHTML } => {
  const ref: RefObjectHTML = useRef(null);
  checkIsAuthenticated();
  const cb = auth.isAuthenticated ? trackUserAction : storeUserAction;

  useEffect(() => {
    if (!trackingEnabled) return;

    if (auth.isAuthenticated) {
      getSoredUserActions()
        .forEach(({ value, metadata, label }) => {
          trackUserAction(value, metadata, label);
        });
    }

    return bindTrackingEventListener(ref, cb);
  }, [ref, cb]);

  return { ref };
};
