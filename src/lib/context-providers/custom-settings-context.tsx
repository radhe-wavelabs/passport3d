import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCustomSettings } from '../../hooks/use-custom-settings';
import { FooterLinkType } from '../api';

export type CustomSettingsContextType = {
  backgroundImgUrl: string | null,
  primaryColorHash: string | null,
  footerLinks: (FooterLinkType | void)[]
}

const useCustomSettingsProvider = () => {
  const { backgroundFile, primaryColor, pageTitle } = useCustomSettings();
  const [ backgroundImgUrl, setBackgroundImgUrl ] = useState<string | null>(backgroundFile);
  const [ primaryColorHash, setPrimaryColorHash ] = useState<string | null>(primaryColor);
  const [ footerLinks, setFooterLinks ] = useState<(FooterLinkType | void)[]>([]);

  useEffect(() => {
    setBackgroundImgUrl(backgroundFile);
    setPrimaryColorHash(primaryColor);
    setFooterLinks(footerLinks);
    document.title = pageTitle;
  }, [ backgroundFile, primaryColor, footerLinks, pageTitle ]);

  return { backgroundImgUrl, primaryColorHash, footerLinks };
};

const customSettingsContext = createContext<CustomSettingsContextType | void>(undefined);

type Props = { children: React.ReactNode | React.ReactNodeArray }
export const CustomSettingsProvider: React.FC<Props> = ({ children }: Props): JSX.Element => {
  const settings = useCustomSettingsProvider() as CustomSettingsContextType;

  return (
    <customSettingsContext.Provider value={settings}>
      {children}
    </customSettingsContext.Provider>
  );
};

export const useSettings = (): CustomSettingsContextType | void => useContext(customSettingsContext);

export default CustomSettingsProvider;
