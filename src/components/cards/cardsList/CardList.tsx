import { forwardRef } from 'react';
import { Card } from '../card/Card';
import { cardOpen } from '@store/slices/appDataSlice';
import { useAppDispatch } from '@hooks/storeHooks';

import styles from './CardList.module.css';
import { Character } from '../../../types/index';

export const CardList = forwardRef<HTMLDivElement, { characters: Character[] }>(
  ({ characters }, ref) => {
    const dispatch = useAppDispatch();
    const onCardClick = (index: number) => dispatch(cardOpen(index));
    const msgForEmptyArr = 'Unfortunately, nothing was found for your request.';

    const renderItems = characters.map((item, index) => (
      <Card
        item={item}
        index={index + 1}
        key={item.id}
        onCardClick={onCardClick}
      />
    ));

    return (
      <div className={styles.cardListWrapper} ref={ref}>
        {renderItems.length > 0 ? renderItems : msgForEmptyArr}
      </div>
    );
  }
);
