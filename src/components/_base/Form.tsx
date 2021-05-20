import React, { FormEvent, ReactNode } from 'react';
import { TestAttrProps } from '../../lib/data-test-attrs';

export type FormProps = {
  children?: ReactNode;
  className?: string;
  onSubmit?(e: FormEvent): Promise<void> | void;
} & TestAttrProps;

export default function Form(props: FormProps): JSX.Element {
  const { children, ...rest } = props;

  return (
    <form noValidate { ...rest }>
      {children}
    </form>
  );
}
