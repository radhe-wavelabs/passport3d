import { KvEmbedTrackingService, KV_LOADER } from '../KvEmbedTrackingService';


const params = { kvID: 1, kvName: '' };
describe('KvEmbedTrackingService', () => {
  it('should throw Error when service instance doesnt exist', () => {
    try {
      KvEmbedTrackingService.trackData(params);
    } catch (e) {
      expect(e.message).toEqual(`Service ${KV_LOADER} is not available`);
    }
  });
  describe('trackData', () => {
    const mockFn = jest.fn();
    Reflect.set(global, KV_LOADER, {
      loaded: false, trackParameters: mockFn
    });
    it('should not perform tracking when not loaded', () => {
      KvEmbedTrackingService.trackData(params);
      expect(mockFn).not.toHaveBeenCalled();
    });
    it('should perform tracking when not loaded', () => {
      Reflect.set(Reflect.get(global, KV_LOADER), 'loaded', true);
      KvEmbedTrackingService.trackData(params);
      expect(mockFn).toHaveBeenCalledWith(params);
    });
  });
});
