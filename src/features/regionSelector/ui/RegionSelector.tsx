import { Region } from '@features/regionSelector';
import { useState } from 'react';

import styles from './RegionSelector.module.scss';

interface RegionSelectorProps {
  onRegionChange: (region: Region) => void;
}

export const RegionSelector: React.FC<RegionSelectorProps> = ({
  onRegionChange,
}) => {
  const [region, setRegion] = useState(Region.All);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRegion = event.target.value as Region;
    setRegion(selectedRegion);
    onRegionChange(selectedRegion);
  };

  return (
    <div className={styles.regionSelector}>
      <label htmlFor="region-select">{'region'}</label>
      <select value={region} onChange={handleChange}>
        {Object.values(Region).map((reg) => (
          <option key={reg} value={reg}>
            {reg}
          </option>
        ))}
      </select>
    </div>
  );
};
