import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { ResponseError } from '../../../config/api';
import { TRACK } from '../../api';
import { composeUrl } from '../../api/utils';
import ApiErrorProvider, { ApiErrorContextType, useApiErrors } from '../api-error-context';

const mockSubscribe = jest.fn();
const mockUnSubscribe = jest.fn();
const mockErr: ResponseError = new Error();

jest.mock('../../services/subscriptions', () => {
  return {
    ApiErrorSubscription: {
      subscribe:(fn: (e: ResponseError) => void) => mockSubscribe(fn(mockErr)),
      unsubscribe: () => mockUnSubscribe()
    }
  };
});


describe('ApiErrorProvider Context', () => {
  const wrapper = (props: {children: React.ReactNode}): JSX.Element => (<ApiErrorProvider>{props.children}</ApiErrorProvider>);
  const getHookResult = () => renderHook(() => useApiErrors() as ApiErrorContextType, { wrapper }).result;

  it('should change state when subscription error occurs', () => {
    const result = getHookResult();
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    expect(mockSubscribe).toHaveBeenCalledTimes(1);
    expect(result.current.hasError()).toBeTruthy();
  });
  it('should reset error state to null', () => {
    const result = getHookResult();
    expect(result.current.hasError()).toBeTruthy();
    act(() => { result.current.resetErrorState(); });
    expect(result.current.hasError()).toBeFalsy();
  });
  it('should not set error if error if filtered by url', () => {
    mockErr.url = composeUrl(TRACK);
    const result = getHookResult();
    expect(result.current.hasError()).toBeFalsy();
  });
});
