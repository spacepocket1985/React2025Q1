import { PureComponent, ReactNode } from 'react';

import Card from '../card/Card';
import { Character } from '../../../types';

import styles from './CardList.module.css';

class CardList extends PureComponent<{ items: Character[] }> {
  render(): ReactNode {
    const { items } = this.props;
    const msgForEmptyArr = 'Unfortunately, nothing was found for your request.';
    const renderItems = items.map((item) => <Card item={item} key={item.id} />);
    return (
      <div className={styles.cardListWrapper}>
        {renderItems.length > 0 ? renderItems : msgForEmptyArr}
      </div>
    );
  }
}
export default CardList;
