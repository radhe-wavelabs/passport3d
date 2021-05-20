import React from 'react';

type ErrorBlockProps = {
  errorMessage: string
}

const ErrorBlock:React.FC<ErrorBlockProps> = ({ errorMessage }) => {
  return(<div className='width-full bg-white text-error py-5 py-40px font-medium font-size-13px break-words bg-opacity-0' dangerouslySetInnerHTML={{ __html: errorMessage }} />);
};

export default ErrorBlock;
