import React from 'react';
import { Redirect } from 'react-router-dom';
import { ROOT } from '../../config/routes/paths';
import { useEventPublicInfo } from '../../hooks/api/public/use-event-public-details';

const NotFoundPage: React.FC = (): JSX.Element | null => {
  const { data, error, isValidating } = useEventPublicInfo();

  if (!isValidating && error) return (
    <div className='grid grid-cols-2 justify-items-auto' style={{ height: '298px' }}>
      <div className='flex flex-col justify-center items-center divide-y-2 divide-gray-500 divide-dashed'>
        <div className='font-medium text-5xl tracking-wide uppercase'>Event does not exist</div>
        <code className='font-mono text-gray-900'>{error?.message}</code>
      </div>
    </div>
  );

  if (!isValidating && data) return <Redirect to={ROOT} />;
  return null;
};



export default NotFoundPage;
