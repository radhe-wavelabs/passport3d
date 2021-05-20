import React, { ChangeEvent, FocusEvent, KeyboardEvent } from 'react';
import { useTestDataAttrProps } from '../../lib/data-test-attrs';

export type InputProps = {
  id: string
  label: string;
  name: string;
  placeholder?: string;
  value: string | number;
  type: string;
  error?: string | boolean;
  autoFocus?: boolean;
  span?: string
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onKeyPress?(e: KeyboardEvent<HTMLInputElement>): void;
  onFocus?(e: FocusEvent<HTMLInputElement>): void;
  onBlur?(e: FocusEvent<HTMLInputElement>): void;
};

export const Input: React.FunctionComponent<InputProps> = (props: InputProps): JSX.Element => {
  const inputClassName = `
    text-sm appearance-none border w-full py-2 px-3 leading-tight 
    focus:outline-none focus:shadow-outline-none 
    focus:border-current placeholder-gray-700
    ${props.error ? ' border-red-600' : ''}
  `;

  const attrProps = useTestDataAttrProps();

  return (
    <>
      <div className='flex'>
        <label className={`block text-white font-bold mt-3 text-sm mb-2`} htmlFor={props.id}>{props.label}</label>
        <span className='ml-1 mt-3 text-sm mb-2 font-normal'>{props.span}</span>
      </div>
      <input
        className={inputClassName}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onFocus={props.onFocus}
        autoFocus={!!props.autoFocus}
        onKeyPress={props.onKeyPress}
        onChange={props.onChange}
        onBlur={props.onBlur}
        { ...attrProps }
      />
      {props.error && (typeof props.error === 'boolean') && <span className='text-red-600 text-xs py-4'>{props.error}</span>}
    </>
  );
};

export default Input;
