import React from 'react';

import styles from './SortSelector.module.scss';

enum SortOrder {
  None = 'None',
  ASC = 'ASC',
  DESC = 'DESC',
}

export const SortSelector: React.FC = () => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value as SortOrder;
    console.log(sort);
  };

  return (
    <div className={styles.sortSelector}>
      <label htmlFor="sort-select">{'sortBy'}</label>
      <select value={SortOrder.None} onChange={handleChange}>
        {Object.values(SortOrder).map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
