import { RefObject, useEffect, useRef } from 'react';

const ATTR_KEY = 'testId';
const ATTR_DELIMITER = ':';

/* ROOT CONTAINERS */
const HEADER = 'header', MAIN = 'main', FOOTER = 'footer';

/* TARGET ELEMENTS FOR APPLYING TEST ATTRIBUTES */
const INPUT = 'input', BUTTON = 'button';

const rootEl = document.getElementById('root');
const CONTAINER_LIST = [ HEADER, MAIN, FOOTER ];

export type TestAttrProps = { name: string };
export type RefObjectHTML = RefObject<HTMLButtonElement & HTMLInputElement>
export type TestAttrParser = (elRef: RefObjectHTML) => string | null;

export const getElementTagName: TestAttrParser = ref => ref.current?.tagName?.toLowerCase?.() ?? null;
export const getElementType: TestAttrParser = ref => ref.current?.type ?? null;
export const getElementName: TestAttrParser = ref => ref.current?.name ?? null;
export const getElementFormName: TestAttrParser = ref => ref.current?.form?.name ?? null;
export const getElementRootTagName: TestAttrParser = ref => CONTAINER_LIST.find(tag => rootEl?.querySelector?.(tag)?.contains(ref.current)) ?? null;

/**
 * Returns name of <form> if exists or name of root container (header, main or footer)
 */
export const getElementContainerTagName: TestAttrParser = ref => getElementFormName(ref) || getElementRootTagName(ref);

export const getParserList = (ref: RefObjectHTML): Array<TestAttrParser> => {
  switch (getElementTagName(ref)) {
  case BUTTON:
    return [ getElementContainerTagName, getElementTagName, getElementName ];
  case INPUT:
  default:
    return [ getElementContainerTagName, getElementTagName, getElementType, getElementName ];
  }
};

export const getDataTestId = (ref: RefObjectHTML): string =>
  getParserList(ref)
    .map(fn => fn(ref))
    .filter(Boolean)
    .join(ATTR_DELIMITER)
;

export const setTestAttrs = (ref: RefObjectHTML):void => {
  if (ref.current) ref.current.dataset[ATTR_KEY] = getDataTestId(ref);
};

export const useTestDataAttrProps = (): { ref: RefObjectHTML } => {
  const ref: RefObjectHTML = useRef(null);
  useEffect(() => {
    setTestAttrs(ref);
  }, [ref]);

  return { ref };
};
