import React from 'react';
import { useCustomSettings } from '../../hooks/use-custom-settings';
import { FooterLinkType, FooterLinkListType } from '../../lib/api';
import { useUserActionTracking } from '../../lib/tracking-data/track-user-action';

/* DEFAULTS */
const
  className = 'my-4 mx-8 inline-block text-primary',
  target = '_blank',
  rel = 'noopener noreferrer'
;

export const FooterLink: React.FC<FooterLinkType> = ({ url: href, label }: FooterLinkType): JSX.Element => {
  const trackingProps = useUserActionTracking();
  return (
    <a
      { ...{ href, rel, target, className }}
      { ...trackingProps }
    >{label}</a>
  );
};

export const FooterLinkList = (): JSX.Element | null => {
  const { footerLinks } = useCustomSettings();

  if (!footerLinks.length) {
    return null;
  }

  const linksProps = footerLinks as FooterLinkListType;

  return (
    <>
      {
        linksProps
          .sort((a: FooterLinkType, b: FooterLinkType) => a.order - b.order)
          .map((props, index) => <FooterLink key={index} {...props} />)
      }
    </>
  );

};

