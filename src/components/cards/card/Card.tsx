import { PureComponent, ReactNode } from 'react';
import { Character } from '../../../types';

import styles from './Card.module.css';

class Card extends PureComponent<{ item: Character }> {
  render(): ReactNode {
    const { item } = this.props;
    return (
      <div className={styles.cardWrapper}>
        <img className={styles.cardImg} src={item.image} alt={item.name} />
        <p className={styles.cardTitle}>{item.name}</p>
      </div>
    );
  }
}

export default Card;
