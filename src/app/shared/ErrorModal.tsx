import React from 'react';
import Modal from 'react-modal';
import Button from '../../components/button';
import { ApiErrorContextType, useApiErrors } from '../../lib/context-providers/api-error-context';

const ErrorModal: React.FC = (): JSX.Element => {
  const { hasError, resetErrorState } = useApiErrors() as ApiErrorContextType;


  const customStyles = {
    overlay: {
      zIndex: 9,
      background: 'rgba(255,255,255, 0.6)'
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '40px',
      width: '500px',
      boxShadow: '6px 6px 20px 0 rgba(0, 0, 0, 0.3)',
    }
  };

  return (
    <Modal
      style={customStyles} isOpen={hasError()} ariaHideApp={false}
    >
      <div className="modal-wrapper flex items-center flex-col">
        <p className="mb-4">
          Something went wrong. Please try again
        </p>
        <Button.Common
          size={'big'}
          name='ok'
          onClick={resetErrorState}
          label='OK'
        />
      </div>
    </Modal>
  );
};

export default ErrorModal;
