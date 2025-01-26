import { PureComponent, ReactNode } from 'react';
import Card from '../card/Card';

import styles from './CardList.module.css';
import { Character } from '../../../types';

class CardList extends PureComponent<{ items: Character[] }> {
  render(): ReactNode {
    const { items } = this.props;
    const renderItems = items.map((item) => <Card item={item} key={item.id} />);
    return <div className={styles.cardListWrapper}>{renderItems}</div>;
  }
}
export default CardList;
