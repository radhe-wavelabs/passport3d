import React from 'react';
import { CustomSettingsContextType, useSettings } from '../../lib/context-providers/custom-settings-context';


export const BackgroundImage: React.FC = (): JSX.Element | null => {
  const { backgroundImgUrl } = useSettings() as CustomSettingsContextType;

  if (backgroundImgUrl) return <img className='background-img' src={backgroundImgUrl} alt=''/>;
  return null;
};
