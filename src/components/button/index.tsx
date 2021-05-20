import React from 'react';
import { ButtonProps, Button } from '../_base/Button';

type CommonBtnProps = Omit<ButtonProps, 'type'>;
const Common: React.FunctionComponent<CommonBtnProps> = (props: CommonBtnProps) => <Button type='button' {...props} />;

type ThumbnailBtnProps = Omit<ButtonProps, 'type' | 'disabled' | 'label' | 'size' | 'className' >;
const Thumbnail: React.FunctionComponent<CommonBtnProps> = (props: ThumbnailBtnProps) =>
  <Button type='button' disabled={false} label='' size='auto' className='mx-auto sm-shadow-gray relative cursor-pointer' {...props} />
;

type SubmitBtnProps = Omit<ButtonProps, 'type'>;
const Submit: React.FunctionComponent<SubmitBtnProps> = (props: SubmitBtnProps) => <Button type='submit' {...props} />;

export default { Common, Thumbnail, Submit };
