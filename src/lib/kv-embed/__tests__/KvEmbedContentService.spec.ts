import { RefObject } from 'react';
import { KvEmbedContentService } from '../KvEmbedContentService';
import { KvEmbedResourceService } from '../KvEmbedResourceService';

jest.mock('../../api', () => {
  return {
    'PROTECTED': {
      fetchCurrentUserInfo: jest.fn().mockImplementation(() => Promise.resolve())
    }
  };
});
jest.mock('../KvEmbedTrackingService');

describe('KvEmbedContentService', () => {
  const mockInitEmbedShowcaseResource = jest.spyOn(KvEmbedResourceService, 'initEmbedShowcase');


  const mockInitEmbedPresentationResource = jest.spyOn(KvEmbedResourceService, 'initEmbedPresentation');
  const { initShowcaseEmbedContentService, initPresentationEmbedContentService } = KvEmbedContentService;
  const embedId = '1', pagePath = 'path', embedRef = { current: null };

  describe('initShowcaseEmbedContentService', () => {
    initShowcaseEmbedContentService(embedId, pagePath, embedRef as RefObject<HTMLDivElement>);
    it('should init showcase resource ', () => {
      expect(mockInitEmbedShowcaseResource).toHaveBeenCalledWith(embedId, pagePath);
    });

  });
  describe('initPresentationEmbedContentService', () => {
    initPresentationEmbedContentService(embedId, embedRef as RefObject<HTMLDivElement>);
    it('should init showcase resource ', () => {
      expect(mockInitEmbedPresentationResource).toHaveBeenCalledWith(embedId);
    });

  });
});
