import { useState } from 'react';

export type AuthError = {
  status?: number,
  message?: string
} | null

export type UseAuthError = {
  error: AuthError,
  setError(e: AuthError): void
}

export const useAuthError = (): UseAuthError => {
  const [ error, setError ] = useState<AuthError>(null);

  return { error, setError };
};
