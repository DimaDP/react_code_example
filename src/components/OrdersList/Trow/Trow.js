import PropTypes from 'prop-types';
import styles from './Trow.module.scss';
import OrdersCheckbox from '../OrdersCheckbox/OrdersCheckbox';
import dateFormatter from '../../../utils/dateFormater';

/**
 * @desc Orders table row
 * @param {Object} order
 * @param {boolean} isSelected
 * @param {function} setSelected
 * @param {string} ordersType
 * @returns {JSX.Element}
 */
const Trow = ({ order, isSelected, setSelected, ordersType }) => {
  const {
    orderId,
    article,
    passedTo,
    completed,
    price,
    clientName,
    distributor,
    createdAt,
    reservationDate,
    receivedFrom,
  } = order;

  const isShownPassedName = ordersType === 'PASSED' || ordersType === 'ALL';

  return (
    <tr className={styles.container} style={{ backgroundColor: isSelected ? '#ECF5FF' : '#FFFFFF' }}>
      <td className={styles.td} style={{ width: '55px', paddingRight: '0px' }}>
        <div className={styles.first}>
          <OrdersCheckbox checked={isSelected} setChecked={() => setSelected(orderId)} />
        </div>
      </td>
      <td className={styles.td}>
        <div>
          <span>{clientName}</span>
        </div>
      </td>
      <td className={styles.td}>
        <div>
          <span>{distributor}</span>
        </div>
      </td>
      <td className={styles.tdSmall}>
        <div>
          <span>{dateFormatter(reservationDate)}</span>
        </div>
      </td>
      <td className={styles.tdSmall}>
        <div>
          <span>{dateFormatter(createdAt)}</span>
        </div>
      </td>
      <td className={styles.td}>
        <div>
          <span>{article}</span>
        </div>
      </td>
      <td className={styles.td}>
        <div>
          <span>{price}</span>
        </div>
      </td>
      {ordersType === 'RECEIVED' && (
        <td className={styles.td}>
          <div>
            <span>{receivedFrom || '-'}</span>
          </div>
        </td>
      )}
      <td className={styles.td}>
        <div className={styles.center}>
          <span>{completed ? 'Abgeschlossen' : 'Aktiv'}</span>
        </div>
      </td>
      {isShownPassedName && (
        <td className={styles.td}>
          <div>
            <span>{passedTo || '-'}</span>
          </div>
        </td>
      )}
    </tr>
  );
};

Trow.propTypes = {
  order: PropTypes.shape({
    article: PropTypes.string,
    passedTo: PropTypes.string,
    completed: PropTypes.bool,
    price: PropTypes.number,
    clientName: PropTypes.string,
    distributor: PropTypes.string,
    createdAt: PropTypes.string,
    reservationDate: PropTypes.string,
    orderId: PropTypes.number,
    receivedFrom: PropTypes.string,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  setSelected: PropTypes.func.isRequired,
  ordersType: PropTypes.string.isRequired,
};

export default Trow;
