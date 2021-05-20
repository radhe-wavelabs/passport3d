import React from 'react';
import TextAsHTML from "../../../components/_base/TextAsHTML";

interface IProps {
  supportInformation: string;
  supportLabel: string;
}
const className = 'editable-support';
const classNameSupportWrapper = `${className}--wrapper`;
const classNameSupportDescription = `${className}--description`;

const SupportPageInfo = (props: IProps): JSX.Element => {

  return (
    <div className={`${classNameSupportWrapper} overflow-hidden shadow-gray bg-white mx-auto md:w-3/4 md:px-8 py-8 mt-12 max-h-full h-full w-100 mx-0 px-0`}>
      <h1 className='font-size-40px pb-8 px-4'>{props?.supportLabel}</h1>
      <hr />
      <div className={`${classNameSupportDescription} mt-5 ml-2 truncate-advanced-15' style={{ minHeight:'40vh' }}`}>
        <TextAsHTML formattedText={props?.supportInformation} />
      </div>
    </div>
  );
};

export default SupportPageInfo;
