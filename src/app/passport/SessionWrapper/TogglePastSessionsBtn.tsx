import React from 'react';

interface IProps {
  changeShowPastFlag: (showPastMeetings: boolean) => void,
  showPastMeetings: boolean
}

const TogglePastSessionsBtn: React.FC<IProps> = (props: IProps): JSX.Element | null => {
  const className = 'editable-session--past-sessions';
  return (
    <div
      className={`${className} text-sm text-primary self-center cursor-pointer text-right mr-2 pt-5`}
      onClick={() => props.changeShowPastFlag(!props.showPastMeetings)}
    >
      {props.showPastMeetings
        ? <><i className='px-1 inline-block not-italic transform -rotate-90'>&#10095;</i> Hide past sessions</>
        : <><i className='px-1 inline-block not-italic transform rotate-90'>&#10095;</i> Show past sessions</>}
    </div>
  );
};

export default TogglePastSessionsBtn;
