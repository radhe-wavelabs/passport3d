import React from 'react';
import TextAsHTML from '../../../components/_base/TextAsHTML';
import KnovioThumbnail from './KnovioThumbnail';
import WelcomeFooter from './WelcomeFooter';
import { EventPrivateDetailsResponseType } from '../../../lib/api';

const WelcomeBlock = (props: EventPrivateDetailsResponseType): JSX.Element => {
  const blockClassName = 'overflow-hidden shadow-gray bg-white mx-auto md:w-3/4 md:px-8 py-8 mt-12 max-h-full ' +
    'h-full w-100 mx-0 px-0 min-h-24rem flex flex-col justify-between';
  const className = 'editable-welcome';
  const classNameWelcomeWrapper = `${className}--wrapper`;
  const classNameWelcomeDescription = `${className}--description`;

  return (
    <div className={`${classNameWelcomeWrapper} ${blockClassName}`}>
      <div>
        <h1 className='font-size-40px pb-8 px-4'>Welcome</h1>
        <hr/>
        <div className={`${classNameWelcomeDescription} mt-5 ml-2 truncate-advanced-15`}>
          <TextAsHTML formattedText={props.privateDescription}/>
        </div>
        {props.welcomeKnovioEnabled && props.welcomeKnovioEmbedId && <KnovioThumbnail welcomeKnovioEmbedId={props.welcomeKnovioEmbedId} />}
      </div>
      <WelcomeFooter {...props} />
    </div>
  );
};

export default WelcomeBlock;
