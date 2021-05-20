import React, { useCallback, useState } from 'react';

type isValid = (value: string) => boolean;
type Formatter = (value: string) => string;
type HookType = {
  value: string,
  onChange(e?: React.ChangeEvent<HTMLInputElement>): void,
  isValid: boolean
}

const getFormattedValue = (value: string, formatters: Formatter[]) => formatters.reduce((val, fmt) => fmt(val), value);
const useFormField = (initialValue = '', validators: isValid[] = [], formatters: Formatter[]): HookType => {
  const [ value, setValue ] = useState<string>(initialValue);

  const onChange = useCallback((e) => {
    setValue(getFormattedValue((e?.target?.value ?? initialValue), formatters));
  }, [initialValue, formatters]);

  const isValid = validators.every(isValidFn => isValidFn(value));

  return { value, onChange, isValid };
};

export default useFormField;
