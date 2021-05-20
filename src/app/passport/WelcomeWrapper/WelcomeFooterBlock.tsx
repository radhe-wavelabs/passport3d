import React from "react";
import { useHistory } from "react-router";

interface IProps{
  classNameWelcomeFooterDescription: string;
  footerBlockClassName: string;
  footerTitleClassName: string;
  enabled: boolean;
  path: string;
  label: string;
  description: string;
}

export const WelcomeFooterBlock = (props: IProps): JSX.Element | null => {
  const history = useHistory();

  if (!props.enabled) {
    return null;
  }

  return (
    <div className={props.footerBlockClassName} onClick={() => history.push(props.path)}>
      <div className='mx-3 bg-primary-lighter-hover cursor-pointer h-full'>
        <div className='p-8 border-t border-b h-full'>
          <div className={props.footerTitleClassName}>
            <span className='font-bold truncate leading-9'>{props.label}</span>
            <span className='font-size-28px leading-8'>&nbsp;&#8250;</span>
          </div>
          <div className={`${props.classNameWelcomeFooterDescription} break-words`}>{props.description}</div>
        </div>
      </div>
    </div>
  );
};