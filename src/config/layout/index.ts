import React, { ReactNode } from 'react';
import { isPassportProfile, isMeetLinksProfile } from '../../app-config';
import HeaderNavBar from '../../app/passport/HeaderNavBar';
import { BackgroundImage } from '../../app/shared/BackgroundImage';
import { FooterLinkList } from '../../app/shared/FooterLink';
import { NOT_FOUND_PATH, SHOWCASE_PATH } from '../routes/paths';

const footerLinks = React.createElement(FooterLinkList);
const mainClassName = `main-content-wrapper ${footerLinks ? '' : 'no-footer'}`;

export enum RootContainers { Header = 'header', Main = 'main', Footer = 'footer' }
type ConfigItemProps = {
  children?: ReactNode | null,
  className?: string,
  copyright?: boolean
}
export type LayoutConfigType = Record<RootContainers, ConfigItemProps>;
type RouteLayoutConfig = Record<string, Partial<LayoutConfigType>>
export type PassportLayoutConfig = LayoutConfigType & { routeLayoutConfig: RouteLayoutConfig };

const passportLayoutConfig: LayoutConfigType = {
  header: { children: React.createElement(HeaderNavBar), className: 'justify-between' },
  main: {
    className: mainClassName,
    children: React.createElement(BackgroundImage),
  },
  footer: {
    className: 'h-20',
    copyright: false,
    children: footerLinks
  }
};

export const routeLayoutConfig: RouteLayoutConfig = {
  [SHOWCASE_PATH]: {
    main: { className: 'showcase-content-wrapper' },
    footer: { children: null }
  },
  [NOT_FOUND_PATH]: {
    header: { children: null }
  }
};

const meetLinksLayoutConfig = {
  main: { className: mainClassName },
  footer: { children: null }
};

export default (() => {
  if (isPassportProfile()) return { ...passportLayoutConfig, routeLayoutConfig } as PassportLayoutConfig;
  if (isMeetLinksProfile()) return meetLinksLayoutConfig;
  return {};
})();
