import React, { useState } from 'react';
import { SortOrder } from '../model/types';

import styles from './SortSelector.module.scss';

interface SortSelectorProps {
  onSortChange: (order: SortOrder) => void;
}

export const SortSelector: React.FC<SortSelectorProps> = ({ onSortChange }) => {
  const [sort, setSort] = useState(SortOrder.None);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value as SortOrder;
    setSort(sort);
    onSortChange(sort);
  };

  return (
    <div className={styles.sortSelector}>
      <label htmlFor="sort-select">{'SortBy population'}</label>
      <select value={sort} onChange={handleChange}>
        <option value={SortOrder.None}>None</option>
        <option value={SortOrder.ASC}>ASC</option>
        <option value={SortOrder.DESC}>DESC</option>
      </select>
    </div>
  );
};
