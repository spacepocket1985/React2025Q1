import { useEffect, useState } from 'react';
import { SearchBar } from '@features/countrySearch/SearchBar';
import {
  Region,
  RegionSelector,
  SortOrder,
  SortSelector,
} from '@features/index';
import { Country, getCountries } from '@entities/country';
import { Spinner } from '@shared/ui';
import { CardList } from 'src/widgets/countriesList';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [filteredCountries, setFilteredCountries] = useState<Country[] | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState(Region.All);
  const [sortOrder, setSortOrder] = useState(SortOrder.None);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (countries) {
      const filtered = countries.filter((country) => {
        const matchesRegion =
          selectedRegion === Region.All || country.region === selectedRegion;
        const matchesSearch = country.name.official
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesRegion && matchesSearch;
      });

      const sorted = [...filtered].sort((a, b) => {
        if (sortOrder === SortOrder.ASC) {
          return a.population - b.population;
        } else if (sortOrder === SortOrder.DESC) {
          return b.population - a.population;
        }
        return 0;
      });

      setFilteredCountries(sorted);
    }
  }, [countries, selectedRegion, searchTerm, sortOrder]);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleRegionChange = (region: Region) => {
    setSelectedRegion(region);
  };

  const handleSortChange = (order: SortOrder) => {
    setSortOrder(order);
  };

  const contentOrSpinner = isLoading ? (
    <Spinner />
  ) : (
    <CardList countries={filteredCountries!} />
  );

  return (
    <main>
      <SearchBar onSearch={handleSearchTermChange} />
      <div className={styles.filterWrapper}>
        <RegionSelector onRegionChange={handleRegionChange} />
        <SortSelector onSortChange={handleSortChange} />
      </div>
      <div className={styles.wrapper}>{contentOrSpinner}</div>
    </main>
  );
};

export default Main;
