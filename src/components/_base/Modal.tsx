import React, { ReactNode } from 'react';
import './Modal.scss';

export type ModalProps = {
  title?: string;
  isOpen: boolean;
  footer?: ReactNode;
  children: ReactNode;
  onClose?(): void;
  className?: string;
};

export const Modal: React.FunctionComponent<ModalProps> = (props: ModalProps): JSX.Element => {
  const className = props.className ?? 'common-modal my-12 mx-auto';
  return (
    <>
      {props.isOpen &&
        <div
          onClick={() => {props.onClose && props.onClose();}}
          className={className}
        >
          <div className='shadow-gray bg-white' onClick={e => e.stopPropagation()}>
            {props.title && <div className='modal-header pt-8 px-8 pb-4'>
              <h1>{props.title}</h1>
            </div>}
            <div className='px-8 text-left'>
              {props.children}
            </div>
            {props.footer && <div className='p-8 text-right'>{props.footer}</div>}
          </div>
        </div>}
    </>
  );
};

export default Modal;
