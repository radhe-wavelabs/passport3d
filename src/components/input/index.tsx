import React from 'react';
import { Input, InputProps } from '../_base/Input';

type InputTypeProps = Omit<InputProps, 'type'>;

const Password: React.FunctionComponent<InputTypeProps> = (props: InputTypeProps) => <Input type='password' {...props} />;
const Email: React.FunctionComponent<InputTypeProps> = (props: InputTypeProps) => <Input type='text' {...props} />;
const Text: React.FunctionComponent<InputTypeProps> = (props: InputTypeProps) => <Input type='text' {...props} />;

export default { Password, Email, Text };
