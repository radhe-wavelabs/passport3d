import React, { createContext, useContext, useEffect, useState } from 'react';

export type MediaQueryContextType = {
  isMobile: boolean | void;
  isDesktop: boolean | void;
}


type SubscriptionConfigType = Record<string, (mediaQuery: MediaQueryList) => void>

function initMatchMediaSubscription(config: SubscriptionConfigType): () => void {
  if (!Reflect.has(window, 'matchMedia')) throw new Error('Browser incompatibility issue');

  const mediaQueryList = Object.entries(config).map(([key, handler]) => {
    const mediaQuery = Reflect.get(window, 'matchMedia')(key);

    handler(mediaQuery);

    mediaQuery.addListener(handler);

    return () => {
      mediaQuery.removeListener(handler);
    };
  });

  return () => {
    mediaQueryList.forEach(Reflect.apply);
  };
}


const useMediaQueryProvider = (): MediaQueryContextType => {
  const [ isMobile, setIsMobile ] = useState<boolean | void>(undefined);
  const [ isDesktop, setIsDesktop ] = useState<boolean | void>(undefined);

  useEffect(() => {
    const subscriptionConfig = {
      '(max-width: 1024px)'(mediaQuery: MediaQueryList) { setIsMobile(mediaQuery.matches); },
      '(min-width: 1025px)'(mediaQuery: MediaQueryList) { setIsDesktop(mediaQuery.matches); }
    };

    return initMatchMediaSubscription(subscriptionConfig);
  }, []);

  return {
    isMobile,
    isDesktop
  };
};

const MediaQueryContext = createContext<MediaQueryContextType | void>(undefined);

type Props = { children: React.ReactNode | React.ReactNodeArray }
export const MediaQueryContextProvider: React.FC<Props> = (props: Props): JSX.Element => {
  const mediaQueryList = useMediaQueryProvider() as MediaQueryContextType;

  return (
    <MediaQueryContext.Provider value={mediaQueryList}>
      {props.children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQuery = (): MediaQueryContextType | void => useContext(MediaQueryContext);

export default MediaQueryContextProvider;
