import { Auth } from 'aws-amplify';

import { AnalyticsService } from '../AnalyticsService';



jest.mock('aws-amplify');
const mockUse = jest.fn();
jest.mock('../HistoryMiddleware', () => {
  return function _historyMiddleware() {
    return {
      use: mockUse
    };
  };
});


describe('AnalyticsService', () => {
  describe('initialization', () => {
    it('should be initialized as disabled when user is not authenticated', async () => {
      Auth.currentAuthenticatedUser = jest.fn(() => Promise.resolve());

      await AnalyticsService.init();
      expect(mockUse).toHaveBeenCalled();


    });
  });
});
