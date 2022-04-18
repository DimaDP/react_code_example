import { observer } from 'mobx-react-lite';
import styles from './Thead.module.scss';
import { useRootModel } from '../../../models/RootModel';

/**
 * @desc Users Table Header
 * @returns {JSX.Element}
 */
const Thead = () => {
  const {
    usersSorting: { setNameSorting },
  } = useRootModel();

  return (
    <thead className={styles.container}>
      <tr>
        <th className={styles.th}>
          <div style={{ paddingLeft: '100px' }} className={styles.left}>
            <span>Firma</span>
          </div>
        </th>
        <th className={styles.th}>
          <div className={styles.left}>
            <span>Name</span>
            <div role='presentation' className={styles.buttons} onClick={setNameSorting}>
              <div className={styles.icon} />
            </div>
          </div>
        </th>
        <th className={styles.th}>
          <div className={styles.left}>
            <span>Telefonnummer</span>
          </div>
        </th>
        <th className={styles.th}>
          <div className={styles.center}>
            <span>Aufträge</span>
          </div>
        </th>
      </tr>
    </thead>
  );
};

export default observer(Thead);
