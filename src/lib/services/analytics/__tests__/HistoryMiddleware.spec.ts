import init, { HistoryMiddleware, OverrideType } from '../HistoryMiddleware';

describe('History Middleware Service', () => {
  describe('Initialization', () => {
    const err = 'HistoryMiddleware initializing failed';
    it('should throw if methodOverride is not of valid type', () => {
      [ undefined , () => ({}) ].forEach(method => {
        try {
          init(method as OverrideType);
        } catch (e) {
          expect(e.message).toEqual(err);
        }
      });
    });
    it('should return instance of HistoryMiddleware Service', () => {
      expect(init((arg: unknown) => undefined)).toBeInstanceOf(HistoryMiddleware);
    });
  });

  describe('HistoryMiddleware', () => {
    const mockFn = jest.fn((arg: unknown) => undefined);
    const service = init(mockFn);
    it('should expose public method "use" to apply method override', () => {
      service.use();
      global.history.pushState('data', 'title');

      expect(mockFn).toHaveBeenCalledWith('data', 'title');
    });
    it('should expose public method "discard" to eject override method', () => {
      mockFn.mockClear();
      service.discard();
      global.history.pushState('data', 'title');

      expect(mockFn).not.toHaveBeenCalled();
    });
  });
});
