import React, { ReactNode } from 'react';
import { TestAttrProps, useTestDataAttrProps } from '../../lib/data-test-attrs';
import './Button.scss';
import { useUserActionTracking } from '../../lib/tracking-data/track-user-action';

export type ButtonProps = {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  label?: string | ReactNode;
  type?: 'button' | 'reset' | 'submit';
  size?: 'big' | 'auto';
  style?: Record<string, string | number | boolean>;
  onClick?(e: React.MouseEvent): void;
  ['data-tooltip']?: string;
  ['data-tooltip-position']?: string;
  ['data-meeting-id']?: string;
} & TestAttrProps;

export function Button(props: ButtonProps): JSX.Element {
  const { label, children, size = 'regular', type = 'button', ...rest } = props;
  let className = 'common-btn ';
  className += props.className || 'px-5 py-3 rounded bg-primary text-white';
  className += size === 'big' ? ' big-button' : '';
  className += className.includes('font-size-') ? '' : ' font-size-14px';

  const attrProps = useTestDataAttrProps();
  const trackingProps = useUserActionTracking();

  return (
    <button { ...rest } className={className} type={type} { ...attrProps } {...trackingProps}>
      <>
        {label}
        {children}
      </>
    </button>
  );
}

