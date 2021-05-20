import React, { ReactNode } from 'react';
import './Header.scss';
import { OE_LOGO, OE_LOGO_ALT_TEXT } from '../../lib/constants';

type Props = {
  children?: ReactNode,
  className?: string
}

const _className = 'w-full h-12 border-black bg-black px-5 py-2 sticky z-2';

const Header: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  return (
    <header className={`${_className} ${props.className || ''}`}>
      <img src={OE_LOGO} alt={OE_LOGO_ALT_TEXT} />
      {props.children}
    </header>
  );
};

export default Header;
