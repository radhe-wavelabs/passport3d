import React from 'react';
import { EventPrivateDetailsResponseType } from '../../../lib/api';
import { AGENDA_PATH, SHOWCASE_PATH, SESSION_PATH } from '../../../config/routes/paths';
import { WelcomeFooterBlock } from './WelcomeFooterBlock';

const WelcomeFooter = (props: EventPrivateDetailsResponseType): JSX.Element => {
  const className = 'editable-welcome-footer';
  const classNameWelcomeFooterTitle = `${className}--title`;
  const classNameWelcomeFooterWrapper = `${className}--wrapper`;
  const classNameWelcomeFooterDescription = `${className}--description`;

  const footerBlockClassName = `${classNameWelcomeFooterWrapper} ${(props.showcaseEnabled && props.sessionEnabled)
    ? 'lg:w-1/3'
    : (props.showcaseEnabled || props.sessionEnabled)
      ? 'lg:w-1/2'
      : 'lg:w-2/3 text-center'}`;
        
  const footerTitleClassName = `${classNameWelcomeFooterTitle} ${'text-primary uppercase ls-1-4px flex align-center ' +
    ((!props.showcaseEnabled && !props.sessionEnabled) ? 'justify-center': '')}`;

  return (
    <div className={`${className} flex text-sm mt-8 flex-col lg:flex-row justify-center items-stretch`}>
      <WelcomeFooterBlock
        classNameWelcomeFooterDescription={classNameWelcomeFooterDescription}
        footerBlockClassName={footerBlockClassName}
        footerTitleClassName={footerTitleClassName}
        enabled={props.agendaEnabled || false}
        label={props.agendaLabel ?? 'My Schedule'}
        path={AGENDA_PATH}
        description={props.agendaLinkDescription || ''}
      />

      <WelcomeFooterBlock
        classNameWelcomeFooterDescription={classNameWelcomeFooterDescription}
        footerBlockClassName={footerBlockClassName}
        footerTitleClassName={footerTitleClassName}
        enabled={props.sessionEnabled || false}
        label={props.sessionLabel || 'General Session'}
        path={SESSION_PATH}
        description={props.sessionLinkDescription || ''}
      />

      <WelcomeFooterBlock
        classNameWelcomeFooterDescription={classNameWelcomeFooterDescription}
        footerBlockClassName={footerBlockClassName}
        footerTitleClassName={footerTitleClassName}
        enabled={props.showcaseEnabled}
        label={props.showcaseLabel || 'Showcase'}
        path={SHOWCASE_PATH}
        description={props.showcaseLinkDescription || ''}
      />

    </div>
  );
};

export default WelcomeFooter;
