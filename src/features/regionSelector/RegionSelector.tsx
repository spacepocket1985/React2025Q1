import styles from './RegionSelector.module.scss';

enum Region {
  All = 'All',
  Americas = 'Americas',
  Africa = 'Africa',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
}

export const RegionSelector: React.FC = () => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value as Region;
    console.log(selectedRegion);
  };

  return (
    <div className={styles.regionSelector}>
      <label htmlFor="region-select">{'region'}</label>
      <select value={Region.All} onChange={handleChange}>
        {Object.values(Region).map((reg) => (
          <option key={reg} value={reg}>
            {reg}
          </option>
        ))}
      </select>
    </div>
  );
};
