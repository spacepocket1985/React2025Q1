import React from 'react';
import { CountryCard } from '@entities/country/ui/CountryCard';
import { Country } from '@entities/country';

import styles from './CountriesList.module.scss';

export const CardList: React.FC<{ countries: Country[] }> = React.memo(
  ({ countries }) => {
    const renderItems = countries.map((country) => (
      <CountryCard country={country} key={country.name.official} />
    ));

    return <div className={styles.cardListWrapper}>{renderItems}</div>;
  }
);
