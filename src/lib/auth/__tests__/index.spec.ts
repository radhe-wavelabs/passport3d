import {
  getCurrentSessionToken, validateCurrentAuthenticatedUser, authenticate, invalidate
} from '../index';

const mockToken = 'TOKEN';
const mockTokenError = 'token error';
const response = { user: true };

const mockFn = jest.fn();
jest.mock('aws-amplify', () => ({
  Auth: {
    currentSession: () => mockFn(),
    signOut: () => mockFn(),
    currentAuthenticatedUser: (...args: unknown[]) => mockFn(...args),
    signIn: (...args: unknown[]) => mockFn(...args)
  }
}));

describe('Auth lib', () => {
  describe('getCurrentSessionToken', () => {
    const getJwtToken = () => mockToken;
    const getIdToken = () => ({ getJwtToken });

    mockFn.mockResolvedValue({ getIdToken });

    it('should resolve current session if exists', async () => {
      const session = await getCurrentSessionToken();
      expect(session).toEqual(mockToken);
    });

    it('should throw an Error if onFailure cb not provided and session does not exist', async () => {
      mockFn.mockImplementation(() => { throw mockTokenError;});
      try {
        await getCurrentSessionToken();
      } catch (e) {
        expect(e).toBe(mockTokenError);
      }
    });
  });

  describe('validateCurrentAuthenticatedUser', () => {
    it('should return result if currentUser is authenticated', async () => {
      mockFn.mockResolvedValue(response);
      const result = await validateCurrentAuthenticatedUser();
      expect(result).toEqual(response);
    });
    it('should not use cached data', async () => {
      expect(mockFn).toHaveBeenCalledWith({ bypassCache: true });
    });
    it('should throw an Error when user is not authenticated', async () => {
      mockFn.mockImplementation(() => { throw mockTokenError;});
      try {
        await validateCurrentAuthenticatedUser();
      } catch (e) {
        expect(e).toEqual(mockTokenError);
      }
    });
  });

  describe('authenticate', () => {
    it('should return currentUser if successfully authenticated', async () => {
      mockFn.mockResolvedValue(response);
      const result = await authenticate('username', '123123');
      expect(result).toEqual(response);
    });
    it('should throw an Error if authentication fails', async () => {
      mockFn.mockImplementation(() => { throw mockTokenError;});
      try {
        await authenticate('username', '123123');
      } catch (e) {
        expect(e).toEqual(mockTokenError);
      }
    });
  });

  describe('invalidate', () => {
    it('should resolve Promise if success', async () => {
      mockFn.mockResolvedValue(true);
      const result = await invalidate();
      expect(result).toEqual(true);
    });
    it('should throw an Error if signOut fails', async () => {
      mockFn.mockImplementation(() => { throw mockTokenError;});
      try {
        await invalidate();
      } catch (e) {
        expect(e).toEqual(mockTokenError);
      }
    });
  });

});
