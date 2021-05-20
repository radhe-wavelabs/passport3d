import React from 'react';
import { ReactComponent as CollapseIcon } from '../../../styles/icons/collapse-view.svg';
import { ReactComponent as ExpandIcon } from '../../../styles/icons/expand-view.svg';

interface IProps {
  isExpandedView: boolean,
  setExpandedView: (isExpandedView: boolean) => void
}

const ToggleSessionsViewBtn: React.FC<IProps> = (props: IProps): JSX.Element | null => {
  const className = 'editable-session';
  const classNameHeaderButtons = `${className}--header-buttons`;
  const classNameHeaderLeftBtn = `${className}--header-left-btn`;
  const classNameHeaderRightBtn = `${className}--header-right-btn`;

  return (
    <div className={`${classNameHeaderButtons} flex`}>
      <div
        className={classNameHeaderLeftBtn + ' mr-2 fill-primary ' + (props.isExpandedView ? '' : 'opacity-20 cursor-pointer')}
        onClick={() => props.setExpandedView(true)}
      >
        <ExpandIcon />
      </div>
      <div
        className={classNameHeaderRightBtn + ' mr-2 fill-primary ' + (props.isExpandedView ? 'opacity-20 cursor-pointer' : '')}
        onClick={() => props.setExpandedView(false)}
      >
        <CollapseIcon />
      </div>
    </div>
  );
};

export default ToggleSessionsViewBtn;
