import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ReactPaginate from 'react-paginate';
import { useRootModel } from '../../models/RootModel';
import Thead from './Thead/Thead';

import styles from './UserList.module.scss';
import Trow from './Trow/Trow';
import Loader from '../Loader/Loader';

/**
 * @desc Users Table UI
 * @returns {JSX.Element}
 */
const UsersList = () => {
  const { users, usersSorting } = useRootModel();

  const { isLoading, getUsers, page, companyFilter, nameFilter, selectUser } = users;
  const { totalPages, number } = page;
  const { name } = usersSorting;
  const { isActive, order } = name;

  useEffect(() => {
    if (!companyFilter && name.isActive) {
      getUsers(0, `name,${name.order}`);
    }
    if (companyFilter && name.isActive) {
      getUsers(0, `user.name,${name.order}`);
    }
    if (name.isActive === false) {
      getUsers(0);
    }
  }, [isActive, order, companyFilter, nameFilter]);

  const onPageChange = async (page) => {
    if (!companyFilter && name.isActive) {
      await getUsers(page.selected, `name,${name.order}`);
    }
    if (companyFilter && name.isActive) {
      await getUsers(page.selected, `user.name,${name.order}`);
    }
    if (name.isActive === false) {
      await getUsers(page.selected);
    }
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  const isPaginationVisible = page.content.length !== 0 && totalPages !== 1;
  const isVisibleNotFound = (companyFilter || nameFilter) && page.content.length === 0;
  const isVisibleCounter = (companyFilter || nameFilter) && page.content.length !== 0 && !isLoading;

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      <table className={styles.table}>
        <Thead />
        <tbody>
          {page.content && page.content.map((user) => <Trow selectUser={selectUser} key={user.id} user={user} />)}
          <tr>
            <td className={styles.info}>
              {isVisibleCounter && <span>Gefundene Personen: {page.content.length}</span>}
            </td>
          </tr>
        </tbody>
      </table>
      {isVisibleNotFound && (
        <>
          <div className={styles.notFound} />
          <div className={styles.text}>Benutzer wurde nicht gefunden</div>
        </>
      )}
      {isPaginationVisible && (
        <ReactPaginate
          initialPage={number}
          forcePage={number}
          previousLabel={null}
          nextLabel={null}
          breakClassName={styles.pageClassName}
          pageClassName={styles.pageClassName}
          previousClassName={styles.previousClassName}
          nextClassName={styles.nextClassName}
          activeClassName={styles.activeClassName}
          containerClassName={styles.pagination}
          pageCount={totalPages}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          breakLabel='...'
          onPageChange={onPageChange}
          disableInitialCallback
        />
      )}
    </div>
  );
};

export default observer(UsersList);
