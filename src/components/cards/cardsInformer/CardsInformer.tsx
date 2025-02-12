import { useEffect, useState, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import {
  removeAllSelectedChars,
  unSelectAllCharacters,
} from '../../../store/slices/charactersSlice';

import styles from './CardsInformer.module.css';

export const CardInformer: React.FC = () => {
  const { selectedCharacters } = useAppSelector((state) => state.characters);

  const [isInformerAnimated, setIsInformerAnimated] = useState(false);
  const dispatch = useAppDispatch();
  const informerClass = `${styles.informer} ${
    isInformerAnimated ? styles.bump : ''
  }`;

  useEffect(() => {
    if (selectedCharacters.length === 0) {
      return;
    }
    setIsInformerAnimated(true);

    const timer = setTimeout(() => {
      setIsInformerAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedCharacters]);

  const handlerUnselectAll = () => {
    dispatch(removeAllSelectedChars());
    dispatch(unSelectAllCharacters());
  };

  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);

  const convertToCSV = () => {
    const header = ['Name', 'Gender', 'Status'];
    const rows = selectedCharacters.map((item) => [
      item.name,
      item.gender,
      item.status,
    ]);

    let csvContent = header.join(',') + '\n';
    rows.forEach((row) => {
      csvContent += row.join(',') + '\n';
    });

    return csvContent;
  };

  const handleDownload = () => {
    const csvContent = convertToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const downloadLink = downloadLinkRef.current;
    const filename = `${selectedCharacters.length}_characters.csv`;

    if (downloadLink) {
      downloadLink.href = url;
      downloadLink.download = filename;
      downloadLink.click();
    }

    URL.revokeObjectURL(url);
  };

  const content = (
    <div className={styles.informweWrapper}>
      <div className={informerClass}>
        <div className={styles.informerLIne}>
          <span>{`Selected - ${selectedCharacters.length} cards`}</span>
        </div>
      </div>
      <button onClick={handlerUnselectAll}>Unselect all</button>
      <a ref={downloadLinkRef} style={{ display: 'none' }}></a>
      <button onClick={handleDownload}>Download</button>
    </div>
  );

  return <>{selectedCharacters.length > 0 && content}</>;
};
