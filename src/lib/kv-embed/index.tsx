import React from 'react';
import { KvPresentationEmbedContainer, KvShowcaseEmbedContainer } from './KvEmbedContainer';

export enum KvEmbedType { SHOWCASE = 'showcase', PRESENTATION = 'presentation' }
export enum EmbedLoadType { DEFER = 'defer', ASYNC = 'async' }
export type SubscriptionType = () => void;


export const EmbedContainer = {
  Showcase: React.memo(KvShowcaseEmbedContainer),
  Knovio: React.memo(KvPresentationEmbedContainer)
};

