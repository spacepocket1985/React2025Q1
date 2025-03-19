import { useEffect, useState } from 'react';

import { SearchBar } from '@features/countrySearch/SearchBar';
import { RegionSelector, SortSelector } from '@features/index';
import { Country, getCountries } from '@entities/country';
import { Spinner } from '@shared/ui';
import { CardList } from 'src/widgets/countriesList';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState<Country[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const contentOrSpinner = isLoading ? (
    <Spinner />
  ) : (
    <CardList countries={countries!} />
  );

  return (
    <main>
      <SearchBar />
      <div className={styles.filterWrapper}>
        <RegionSelector />
        <SortSelector />
      </div>
      <div className={styles.wrapper}>{contentOrSpinner}</div>
    </main>
  );
};

export default Main;
