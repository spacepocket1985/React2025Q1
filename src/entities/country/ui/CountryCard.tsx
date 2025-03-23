import React, { useEffect, useState } from 'react';
import { Country } from '@entities/country/model/types';

import styles from './CountryCard.module.scss';

interface CountryCardProps {
  country: Country;
}

export const CountryCard: React.FC<CountryCardProps> = React.memo(
  ({ country }) => {
    const [visited, setVisited] = useState(false);

    useEffect(() => {
      const visitedCountries = JSON.parse(
        localStorage.getItem('visitedCountries') || '[]'
      );
      if (visitedCountries.includes(country.name.official)) {
        setVisited(true);
      }
    }, [country.name.official]);

    const handleToggle = () => {
      setVisited((prev) => {
        const newVisited = !prev;

        const visitedCountries = JSON.parse(
          localStorage.getItem('visitedCountries') || '[]'
        );

        if (newVisited) {
          visitedCountries.push(country.name.official);
          localStorage.setItem(
            'visitedCountries',
            JSON.stringify(visitedCountries)
          );
        } else {
          const updatedVisitedCountries = visitedCountries.filter(
            (name: string) => name !== country.name.official
          );
          localStorage.setItem(
            'visitedCountries',
            JSON.stringify(updatedVisitedCountries)
          );
        }

        return newVisited;
      });
    };

    return (
      <div
        className={styles.cardWrapper}
        onClick={handleToggle}
        style={{ border: visited ? '12px solid #f0b709' : 'none' }}
      >
        <img
          className={styles.cardImg}
          src={country.flags.png}
          alt={country.name.official}
        />
        <p className={styles.cardTitle}>{country.name.official}</p>
        <p className={styles.cardTitle}>{`Region - ${country.region}`}</p>
        <p
          className={styles.cardTitle}
        >{`Population - ${country.population}`}</p>
        {visited && <p className={styles.visited}>{'visited'}</p>}
      </div>
    );
  }
);
