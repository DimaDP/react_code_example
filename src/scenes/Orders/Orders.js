import { observer } from 'mobx-react-lite';
import OrdersFilter from '../../components/OrdersFilters/OrdersFilter';
import { useRootModel } from '../../models/RootModel';
import OrdersList from '../../components/OrdersList/OrdersList';
import styles from './Orders.module.scss';

const Orders = () => {
  const {
    users: { selectedUser },
  } = useRootModel();
  return (
    <div className={styles.container}>
      <OrdersFilter user={selectedUser} />
      <OrdersList />
    </div>
  );
};

export default observer(Orders);
