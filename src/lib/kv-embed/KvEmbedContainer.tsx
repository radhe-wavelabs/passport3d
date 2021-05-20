import React, { ReactNode, RefObject, useEffect } from 'react';
import { KvEmbedContentService } from './KvEmbedContentService';

export type KvEmbedProps = {
  embedId: string | null;
  className?: string;
  children?: ReactNode;
}

const _className = 'KnowledgeVisionEmbeddedContent';
const _style = { display: 'none' };
export type EmbedRefType = HTMLDivElement

export const KvEmbedContainer = React.forwardRef<EmbedRefType, KvEmbedProps>((props, ref) => {
  if (!props.embedId) return null;

  return (
    <div
      ref={ref}
      id={`${_className}${props.embedId}`}
      className={`${_className} ${props.className || ''}`}
      style={_style}
    />
  );
});

export type KvEmbedShowcaseProps = { pagePath?: string } & KvEmbedProps;
export const KvShowcaseEmbedContainer = (props: KvEmbedShowcaseProps): JSX.Element => {
  const ref: RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    if (props.embedId && ref.current) {
      return KvEmbedContentService.initShowcaseEmbedContentService(props.embedId, props.pagePath, ref);
    }
  }, [props.embedId, props.pagePath, ref]);

  return (
    <KvEmbedContainer {...props} ref={ref} />
  );
};
KvShowcaseEmbedContainer.defaultProps = {
  className: 'h-full'
};

export const KvPresentationEmbedContainer = (props: KvEmbedProps): JSX.Element => {
  const ref: RefObject<HTMLDivElement> = React.createRef();

  useEffect(() => {
    if (props.embedId) {
      return KvEmbedContentService.initPresentationEmbedContentService(props.embedId, ref);
    }
  }, [props.embedId, ref]);

  return (
    <KvEmbedContainer {...props} ref={ref} />
  );
};

export default KvEmbedContainer;
