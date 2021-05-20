import React, { useState } from 'react';
import { Button } from '../../../components/_base/Button';
import useNavBarItemsConfig, { ConfigItemType } from '../../../hooks/use-navbar-items';
import { IAuthContext, useAuth } from '../../../lib/context-providers/auth-context';
import { useMediaQuery, MediaQueryContextType } from '../../../lib/context-providers/media-query-provider';
import { NavItem } from './NavBarItem';

const className = 'my-0 px-4 sm:px-4 whitespace-no-wrap text-white ' +
  'font-size-14px font-medium cursor-pointer ';


const HeaderNavBar: React.FC = (): JSX.Element | null => {
  const auth = useAuth() as IAuthContext;
  const { isMobile = false, isDesktop = false } = useMediaQuery() as MediaQueryContextType;
  const itemsConfig = useNavBarItemsConfig(isDesktop);

  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const toggleNavBar = () => setIsOpen(prevState => !prevState);
  const classNameHeader = 'editable-header';
  const classNameHeaderWrapper = `${classNameHeader}-wrapper`;

  type Props = {
    className: string,
    toggleNavBar?: () => void,
    items: ConfigItemType[] | null,
    isMobile: boolean,
    isDesktop: boolean
  };
  const NavItems: React.FC<Props> = (props: Props): JSX.Element | null => {
    if (!props.items) return null;
    return (
      <>
        <div className={classNameHeaderWrapper + ' ' + props.className + ' w-full justify-end'}>
          {props.items.map((item, i) => (
            <NavItem
              {...item}
              key={i}
              onClick={props.toggleNavBar}
              isMobile={props.isMobile}
            />))}
        </div>
        <Button
          name='signOut'
          className='border-none focus:outline-none cursor-default justify-end flex'
          onClick={() => {
            props.toggleNavBar && props.toggleNavBar();
            auth.signOut();
          }}
        >
          <span {...{ className }}>Sign Out</span>
        </Button>
      </>
    );
  };
  NavItems.defaultProps = {
    isDesktop: false,
    isMobile: false
  };

  if (itemsConfig) return (
    <>
      {isDesktop &&
        <div className={`${classNameHeader} hidden justify-end w-3/4 lg:flex`}>
          <NavItems className='flex' items={itemsConfig} isMobile={isMobile} isDesktop={isDesktop}/>
        </div>
      }

      {isMobile &&
        <div className={`${classNameHeader} lg:hidden block`}>
          <Button
            name='signOut'
            className={`${className} flex border-none focus:outline-none cursor-default`}
            onClick={toggleNavBar}
          >Menu
          </Button>
          {/* TODO: ADD handle click in mobile nav for close dropdown menu */}
          {isOpen &&
            <nav className="flex w-full bg-black p-4 absolute left-0 top-48px justify-end text-right">
              <div className="flex text-sm text-white flex-col bg-black border-yellow-900 max-w-full w-full">
                <NavItems className='flex flex-col' items={itemsConfig} toggleNavBar={toggleNavBar} isMobile={isMobile} isDesktop={isDesktop}/>
              </div>
            </nav>
          }
        </div>
      }

    </>
  );
  return null;
};

export default HeaderNavBar;
