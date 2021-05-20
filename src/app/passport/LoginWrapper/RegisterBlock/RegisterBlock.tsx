import React from 'react';
import { useHistory } from 'react-router';
import { REGISTRATION_PATH } from '../../../../config/routes/paths';
import Button from '../../../../components/button';

const RegisterBlock: React.FC = (): JSX.Element => {
  const history = useHistory();

  return (
    <div className='bg-white py-8 px-10 flex justify-between items-center  font-medium'>
      <span className='font-size-13px'>Not registered yet?</span>
      <Button.Common
        size={'auto'}
        name='Register Now'
        onClick={() => history.push(REGISTRATION_PATH)}
        label='Register Now'
        className='px-4 py-2 rounded text-center bg-white border font-medium border-gray-400 text-primary font-size-13px'
      />
    </div>
  );
};

export default RegisterBlock;
