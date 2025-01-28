import { useState, useCallback } from 'react';

type UseHttpReturnType<T> = {
  loading: boolean;
  error: string;
  request: (url: string) => Promise<T>;
  clearError: () => void;
};

export const useHttp = <T>(): UseHttpReturnType<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = useCallback(async (url: string): Promise<T> => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data: T = await response.json();
      return data;
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
        throw e;
      } else {
        setError('An unknown error occurred');
        throw new Error('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(''), []);

  return { loading, request, error, clearError };
};
