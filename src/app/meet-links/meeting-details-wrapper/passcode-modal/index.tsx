import React, { useState } from 'react';
import Modal from '../../../../components/_base/Modal';
import Input from '../../../../components/input';
import { Button } from '../../../../components/_base/Button';

interface IProps {
  errorMessage?: string;
  onSetPasscode(newPasscode: string): void;
}

const PASSCODE_MIN_LENGTH = 6;

const PasscodeModal: React.FunctionComponent<IProps> = (props: IProps) => {
  const [passcode, setPasscode] = useState('');
  return (
    <>
      <Modal
        title='Sign In'
        isOpen={true}
        footer={
          <Button
            name='signIn'
            type='button'
            disabled={passcode.length < PASSCODE_MIN_LENGTH}
            onClick={() => props.onSetPasscode(passcode)}
            className='py-4 px-8 rounded-md bg-blue text-white'
            label='Continue'
          />
        }
      >
        <>
          <p className='mb-3 text-sm'>Please enter your meeting passcode.</p>
          <Input.Password
            id='passcode'
            name='passcode'
            label='Passcode'
            value={passcode}
            autoFocus={true}
            error={props.errorMessage}
            onKeyPress={(e: React.KeyboardEvent) => e.key === 'Enter' && props.onSetPasscode(passcode)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasscode(e.target.value)}
          />
        </>
      </Modal>
    </>
  );
};

export default PasscodeModal;
