export default function useSetId(key: string): void {
  const elemId = document.querySelector('[data-id="app"]');
  const id = key ? `${key}-page` : `sign-in-page`; 
  if (elemId) {
    elemId.setAttribute('id', id);
  }
}

