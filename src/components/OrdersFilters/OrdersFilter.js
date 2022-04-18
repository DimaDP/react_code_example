import { observer } from 'mobx-react-lite';
import PropTypes from 'prop-types';
import UserNavigator from '../UserNavigator/UserNavigator';
import styles from './OrdersFilter.module.scss';
import OrdersTypeSelector from '../OrdersTypeSelector/OrdersTypeSelector';
import ProcessOrder from '../ProccessOrder/ProccessOrder';
import PassOrderForm from './PassOrderForm/PassOrderForm';
import { useRootModel } from '../../models/RootModel';

/**
 * @desc Container for orders filters
 * @param {Object} user - selected user
 * @returns {JSX.Element}
 */
const OrdersFilter = ({ user }) => {
  const {
    orders: { isActivePassOrderMenu },
  } = useRootModel();
  return (
    <div className={styles.container}>
      <UserNavigator user={user} />
      <PassOrderForm isOpen={isActivePassOrderMenu} />
      <div className={styles.types}>
        <OrdersTypeSelector />
        <ProcessOrder />
      </div>
    </div>
  );
};

OrdersFilter.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default observer(OrdersFilter);
