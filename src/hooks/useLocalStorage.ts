import { useState, useEffect } from 'react';

import { querySearchParam, storageKey } from '../utils/getPageSearchParams';
import { DefaultQuery } from '../service/futuramaAPI';

export const useLocalStorage = (): [
  string | null,
  React.Dispatch<React.SetStateAction<string | null>>,
] => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return querySearchParam;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, searchTerm || DefaultQuery);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};
