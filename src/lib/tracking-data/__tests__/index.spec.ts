import { EventAction, EventType } from '../../api';
import { getDateTimeIsoOmitMs } from '../../helpers/dateHelper';
import { sendTrackingData, storeUserAction, trackUserAction, getSoredUserActions } from '../index';

const mockFn = jest.fn();
jest.mock('../../api/protected', () => ({
  sendTrackingData: (...args: never[]) => mockFn(...args)
}));

const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');
const mockGetItem = jest.spyOn(Storage.prototype, 'getItem');
const mockRemoveItem = jest.spyOn(Storage.prototype, 'removeItem');

const mockEvent = {
  type: EventType.USER_ACTION,
  action: EventAction.CLICK,
  generatedDateTime: getDateTimeIsoOmitMs(),
  value: '_value',
  label: '',
  metadata: {}
};
const storedActionValue = { value: mockEvent.value, metadata: mockEvent.metadata, label: mockEvent.label };

describe('Manage tracked User Action', () => {
  beforeEach(mockFn.mockClear);
  it('should send tracking data by using private Api', async () => {
    await sendTrackingData(mockEvent);
    expect(mockFn).toHaveBeenCalledWith(mockEvent);
  });

  it('should re-throw an Error if occurred', async () => {
    const e = new Error();
    mockFn.mockRejectedValueOnce(e);
    return sendTrackingData(mockEvent).catch(err => {
      expect(err).toEqual(e);
    });
  });
  xit('should send composed user action', async () => {
    await trackUserAction(mockEvent.value);
    expect(mockFn).toHaveBeenCalledWith(mockEvent);
  });
  it('should be able to store User Action in session storage', () => {
    const value = JSON.stringify(storedActionValue);
    storeUserAction(mockEvent.value, mockEvent.metadata);
    expect(mockSetItem).toHaveBeenCalledWith(`USER_ACTION::${mockEvent.value}`, value);
  });
  it('should be able to retrieve and remove stored User Actions from session storage', () => {

    expect(getSoredUserActions()).toEqual([storedActionValue]);
    expect(mockGetItem).toHaveBeenCalledWith(`USER_ACTION::${mockEvent.value}`);
    expect(mockRemoveItem).toHaveBeenCalledWith(`USER_ACTION::${mockEvent.value}`);
  });
});
