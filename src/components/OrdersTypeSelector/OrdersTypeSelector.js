import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import styles from './OrdersTypeSelector.module.scss';
import { useRootModel } from '../../models/RootModel';

/**
 * @desc Change order type UI
 * @returns {JSX.Element}
 */
const Divider = () => {
  return (
    <div className={styles.divider}>
      <div className={styles.dividerLine} />
    </div>
  );
};

const OrdersTypeSelector = () => {
  const {
    orders: { ordersType, changeStatus, ordersCounter },
  } = useRootModel();

  const getCounter = (status) => {
    return ordersCounter.find((item) => item.status === status)?.total || 0;
  };

  const selectorStyles = (name) =>
    classNames({
      [styles.item]: true,
      [styles.selected]: ordersType === name,
    });

  const setCounter = () => {
    return classNames({
      [styles.counter]: true,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div role='presentation' className={selectorStyles('ALL')} onClick={() => changeStatus('ALL')}>
          Alle<div className={setCounter('ALL')}>{getCounter('ALL')}</div>
        </div>
        <div role='presentation' className={selectorStyles('ACTIVE')} onClick={() => changeStatus('ACTIVE')}>
          Angelegt<div className={setCounter('ACTIVE')}>{getCounter('ACTIVE')}</div>
        </div>
        <div role='presentation' className={selectorStyles('COMPLETED')} onClick={() => changeStatus('COMPLETED')}>
          Abgeschlossen<div className={setCounter('COMPLETED')}>{getCounter('COMPLETED')}</div>
        </div>
        <Divider />
        <div role='presentation' className={selectorStyles('RECEIVED')} onClick={() => changeStatus('RECEIVED')}>
          Erhaltene<div className={setCounter('RECEIVED')}>{getCounter('RECEIVED')}</div>
        </div>
        <div role='presentation' className={selectorStyles('PASSED')} onClick={() => changeStatus('PASSED')}>
          Gesendet<div className={setCounter('PASSED')}>{getCounter('PASSED')}</div>
        </div>
      </div>
    </>
  );
};

export default observer(OrdersTypeSelector);
