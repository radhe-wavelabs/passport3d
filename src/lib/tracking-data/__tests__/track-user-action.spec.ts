import {
  getElementTagName, getElementRootTagName, getElementContainerTagName, getTrackingAttrs,
  eventHandler, bindTrackingEventListener,
} from '../track-user-action';

const MAIN = 'main';
const rootEl = document.createElement('div');
const mainEl = document.createElement(MAIN);
const divEl = document.createElement('div');
const buttonEl = document.createElement('button');
buttonEl.innerText = 'submit';
buttonEl.dataset.meetingId = 'meetingId';

const linkEl = document.createElement('a');
linkEl.href = 'some.url.com';
linkEl.innerText = 'some url';

rootEl.id='root';
mainEl.appendChild(buttonEl);
rootEl.appendChild(mainEl);


describe('Tracking User Action', () => {
  it('should get name of HTML element or return null', () => {
    expect(getElementTagName(divEl)).toEqual('div');
    expect(getElementTagName({} as HTMLDivElement)).toEqual(null);
  });
  it('should get name of HTML root element or return null', () => {
    expect(getElementRootTagName(buttonEl)).toEqual(null);
    expect(getElementContainerTagName(buttonEl)).toEqual(getElementRootTagName(buttonEl));
  });
  it('should parse tracking attributes from Button', () => {
    expect(getTrackingAttrs(buttonEl))
      .toEqual({ "elementType": "button", "label": "", "meetingId": "meetingId", "name": "", "value": "submit" });
  });
  it('should parse tracking attributes from link', () => {
    expect(getTrackingAttrs(linkEl))
      .toEqual({ "elementType": "link", "href": "some.url.com", "label": "", "value": "some url" });
  });
  it('should not parse tracking attributes for elements differ from button and link ', () => {
    expect(getTrackingAttrs(null)).toEqual(null);
  });
  it('should handle mouse events with callback if provided', () => {
    const mockFn = jest.fn();
    eventHandler(new MouseEvent('click'), { current: buttonEl }, mockFn);
    expect(mockFn).toHaveBeenCalledWith('submit', { "elementType": "button", "meetingId": "meetingId", "name": "" }, "");
    eventHandler(new MouseEvent('click'), { current: buttonEl });
    eventHandler(new MouseEvent('click'), { current: divEl });
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  it('should bind event listener to click event', () => {
    const mockFn = jest.fn((...args: never[]) => args);
    buttonEl.addEventListener = mockFn;
    bindTrackingEventListener({ current: buttonEl });

    expect(mockFn).toHaveBeenCalledWith('click', expect.any(Function));

  });
});
