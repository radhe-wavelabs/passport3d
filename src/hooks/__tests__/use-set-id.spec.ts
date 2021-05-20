import useSetId from '../use-set-id';

describe('useSetId', () => {
  document.body.innerHTML = '<div data-id="app"></div>';
  const elemId = document.querySelector('[data-id="app"]');

  it('id should be sign-in-page', () => {
    useSetId('');
    expect(elemId?.id).toEqual('sign-in-page');
  });

  it('id should be welcome-page', () => {
    useSetId('welcome');
    expect(elemId?.id).toEqual('welcome-page');
  });

  it('id should be session-page', () => {
    useSetId('session');
    expect(elemId?.id).toEqual('session-page');
  });
});
