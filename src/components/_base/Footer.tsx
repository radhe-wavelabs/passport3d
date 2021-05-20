import React, { ReactNode } from 'react';
import { useCustomSettings } from '../../hooks/use-custom-settings';

type FooterProps = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const _className = 'bg-white text-center mt-0 py-4 font-size-14px w-full bottom-0';

const Footer: React.FunctionComponent<FooterProps> = (props: FooterProps = { children: null }) => {
  /* [QU-6298] NO CHILDREN - NO FOOTER */

  const { footerLinks } = useCustomSettings();

  if (!props.children) return null;
  if (!footerLinks.length) return null;

  return (
    <footer className={`${_className} ${props.className || ''}`} style={props.style}>
      {props.children}
    </footer>
  );
};
export default Footer;
