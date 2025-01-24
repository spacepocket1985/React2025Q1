import { PureComponent, ReactNode } from 'react';
import Card from '../card/Card';

import styles from './CardList.module.css';
import { Character } from '../../../types';

class CardList extends PureComponent<{ items: Character[] }> {
  render(): ReactNode {
    return (
      <div className={styles.cardListWrapper}>
        <Card />
      </div>
    );
  }
}

export default CardList;
