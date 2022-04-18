import { observer } from 'mobx-react-lite';
import styles from './Thead.module.scss';
import OrdersCheckbox from '../OrdersCheckbox/OrdersCheckbox';
import { useRootModel } from '../../../models/RootModel';

/**
 * @desc Thed for Orders table
 * @returns {JSX.Element}
 */
const Thead = () => {
  const {
    orders: { setCheckedAll, isCheckedAll, ordersType },
  } = useRootModel();

  const isShownPassedName = ordersType === 'PASSED' || ordersType === 'ALL';
  const isReceived = ordersType === 'RECEIVED';

  return (
    <thead className={styles.container}>
      <tr>
        <th className={styles.firstTh}>
          <div style={{ paddingLeft: '100px' }} className={styles.left}>
            <OrdersCheckbox checked={isCheckedAll} setChecked={setCheckedAll} />
          </div>
        </th>
        <th className={styles.th}>
          <div className={styles.left}>
            <span>Firmenname</span>
          </div>
        </th>
        <th className={styles.th}>
          <div className={styles.left}>
            <span>Händler</span>
          </div>
        </th>
        <th className={styles.th}>
          <div className={styles.left}>
            <span>Reserviert bis</span>
          </div>
        </th>
        <th className={styles.th}>
          <div className={styles.left}>
            <span>Datum der Bestellung</span>
          </div>
        </th>
        <th className={styles.th}>
          <div className={styles.left}>
            <span>Artikel</span>
          </div>
        </th>
        <th className={styles.th} style={{ width: '90px' }}>
          <div className={styles.left}>
            <span>Gesamtpreis</span>
          </div>
        </th>
        {isReceived && (
          <th className={styles.th}>
            <div className={styles.left}>
              <span>Eigentümer</span>
            </div>
          </th>
        )}
        <th className={styles.th}>
          <div className={styles.left}>
            <span>Status</span>
          </div>
        </th>
        {isShownPassedName && (
          <th className={styles.th}>
            <div className={styles.left}>
              <span>Weitergegeben an</span>
            </div>
          </th>
        )}
      </tr>
    </thead>
  );
};

export default observer(Thead);
