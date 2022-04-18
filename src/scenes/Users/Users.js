import Filters from '../../components/Filters/Filters';
import UsersList from '../../components/UsersList/UsersList';
import styles from './Users.module.scss';

const Users = () => {
  return (
    <div className={styles.container}>
      <Filters />
      <UsersList />
    </div>
  );
};

export default Users;
