import { EMBED, KvEmbedType, THUMBNAIL } from '../constants';

/**
 * Return API url with prepended API_ROOT
 * @param args - url paths to join
 * @return composed url
 */
export const composeUrl = (...args: string[]): string => [ process.env.REACT_APP_API_ROOT, ...args ].join('/');

/**
 * Get query argument value by key.
 * If no url provided - window.location will be used as defaults
 * @param key - string
 * @param url - string.
 */
export const getUrlQueryArgByKey = (key: string, url: string = window.location.href): string | null => {
  try {
    const { searchParams } = new URL(url);
    return searchParams.get(key);
  } catch {
    return null;
  }
};

/**
 * Get Knowledgevision url prefix based on env.
 * @param env - string
 */
export const getKvEnvPrefix = (env: string | void = process.env.REACT_APP_FE_ENV): string | void => {
  switch (env) {
  case 'development':
    return 'dev-';
  case 'qa':
  case 'stage':
    return 'stage-';
  case 'prod':
    return '';
  default:
    return;
  }
};

const _ENV = process.env.REACT_APP_FE_ENV;

export const getKvContentUrl = (env: string | void = _ENV): string =>
  `https://${getKvEnvPrefix(env)}view.knowledgevision.com`
;

export const getKvContentKnovioUrl = (embedId = '', env: string | void = _ENV): string =>
  `${getKvContentUrl(env)}/${KvEmbedType.PRESENTATION}/${embedId}`
;

export const getKvThumbnailUrl = (embedId = '', icon = true, env: string | void = _ENV): string =>
  `${getKvContentUrl(env)}/${THUMBNAIL}/${embedId}?play_icon=${icon}`
;

export const getKvEmbedContentUrl = (embedType: KvEmbedType, embedId: string, env: string | void = _ENV): string =>
  `${getKvContentUrl(env)}/${embedType}/${EMBED}/${embedId}.js`
;

export const getKvEmbedShowcaseUrl = (embedId: string, env: string | void = _ENV): string =>
  getKvEmbedContentUrl(KvEmbedType.SHOWCASE, embedId, env)
;
export const getKvEmbedShowcasePageUrl = (embedId: string, pagePath: string, env: string | void = _ENV): string =>
  `${getKvEmbedShowcaseUrl(embedId, env)}?page=${pagePath}`
;
export const getKvEmbedPresentationUrl = (embedId: string, env: string | void = _ENV): string =>
  getKvEmbedContentUrl(KvEmbedType.PRESENTATION, embedId, env)
;
