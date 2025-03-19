import { Country } from '@entities/country/model/types';

import styles from './CountryCard.module.scss';

export const CountryCard: React.FC<{
  country: Country;
}> = ({ country }) => {
  return (
    <div className={styles.cardWrapper}>
      <img
        className={styles.cardImg}
        src={country.flags.png}
        alt={country.name.official}
      />
      <p className={styles.cardTitle}>{country.name.official}</p>
      <p className={styles.cardTitle}>{`Region - ${country.region}`}</p>
      <p
        className={styles.cardTitle}
      >{`Population - ${country.population} mln`}</p>
    </div>
  );
};
