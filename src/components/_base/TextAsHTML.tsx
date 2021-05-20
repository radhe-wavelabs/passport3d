import React from 'react';

type TextAsHTMLProps = {
  formattedText?: string
}

const TextAsHTML:React.FC<TextAsHTMLProps> = ({ formattedText }) => {
  const createMarkup = () => {
    return { __html: formattedText || '' };
  };
  return <div dangerouslySetInnerHTML={createMarkup()}/>;
};

export default TextAsHTML;
