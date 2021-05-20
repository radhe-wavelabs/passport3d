import React, { useState } from 'react';
import Modal from 'react-modal';
import { getKvEnvPrefix } from '../../../lib/api/utils';
import { KNOVIO_URL, SECURE_PROTO, THUMBNAIL } from '../../../lib/constants';
import { EmbedContainer } from '../../../lib/kv-embed';
import Icon from '../../../components/_base/Icon';

interface IProps {
  welcomeKnovioEmbedId: string
}

const KnovioThumbnail = (props: IProps): JSX.Element => {
  const [ openThumbnail, setOpenThumbnail ] = useState<boolean>(false);

  const className = `editable-welcome-knovio`;
  const classNameKnovioWrapper = `${className}--wrapper`;

  const toggleModal = () => {
    setOpenThumbnail(!openThumbnail);
  };

  if (Modal && Modal.defaultStyles) {
    if(Modal.defaultStyles.content) {
      Modal.defaultStyles.content.border = 'none';
      Modal.defaultStyles.content.borderRadius = 0;
      Modal.defaultStyles.content.padding = 0;
      Modal.defaultStyles.content.top = '40px';
    }
    if (Modal.defaultStyles.overlay) {
      Modal.defaultStyles.overlay.zIndex = 3;
      Modal.defaultStyles.overlay.background = 'rgba(0,0,0,0.75)';
    }
  }

  return (
    <div
      className={`${className} mx-auto mt-8 bg-black sm-shadow-gray relative cursor-pointer`}
      style={{ width: '320px', minHeight: '100px' }}
      onClick={toggleModal}
    >
      <Modal isOpen={openThumbnail} ariaHideApp={false} onRequestClose={toggleModal}>
        <>
          <div className='fixed line-height-40px top-0 right-0 text-center' style={{ width: '40px' }}>
            <span className='cursor-pointer text-white font-size-24px font-bold' onClick={toggleModal}>&#x2715;</span>
          </div>
          <EmbedContainer.Knovio embedId={props.welcomeKnovioEmbedId} />
        </>
      </Modal>
      <img
        className='h-full w-full object-contain'
        alt='knovio thumbnail'
        src={`${SECURE_PROTO}://${getKvEnvPrefix()}${KNOVIO_URL}/${THUMBNAIL}/${props.welcomeKnovioEmbedId}`}
      />
      <div className={`${classNameKnovioWrapper} absolute top-0 left-0 w-full h-full flex`}>
        <div className='m-auto rounded-full h-12 w-12 p-left-10px p-top-7px bg-gray-50'>
          <span className='fill-current text-white'>
            <Icon.RightArrow width='35px' height='35px' />
          </span>
        </div>
      </div>
    </div>
  );
};

export default KnovioThumbnail;
