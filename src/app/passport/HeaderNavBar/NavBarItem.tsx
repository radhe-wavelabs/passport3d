import React from 'react';
import { NavLink } from 'react-router-dom';
import { MIN_DESKTOP_LABEL_LENGTH } from '../../../hooks/use-navbar-items';
import { useUserActionTracking, UserActionTrackingProps } from '../../../lib/tracking-data/track-user-action';

interface IProps extends Partial<NavLink>, Partial<UserActionTrackingProps> {
  className?: string,
  activeClassName?: string,
  onClick?(): void,
  label: string,
  to: string,
  isMobile: boolean,
}

const className = 'my-0 px-4 sm:px-4 whitespace-no-wrap text-white font-size-14px font-medium cursor-pointer flex justify-end header-button';
const activeClassName = 'navbar-item-label-active';

export const NavItem: React.FC<IProps> = (props: IProps): JSX.Element | null => {
  const { label, isMobile, ...rest } = props;

  const trackingProps = useUserActionTracking();

  const style = { minWidth: '10ch' };
  const _props = label.length > MIN_DESKTOP_LABEL_LENGTH ? { ...rest, style } : rest;

  const navLabel = isMobile
    ? <span className='truncate leading-4 my-4'>{label}</span>
    : <div className='truncate w-full'>{label}</div>
  ;


  return (
    <NavLink {..._props} {...trackingProps}>
      {console.log("naveLabel",navLabel)}
      {navLabel}
    </NavLink>
  );
};

NavItem.defaultProps = {
  className,
  activeClassName
};
