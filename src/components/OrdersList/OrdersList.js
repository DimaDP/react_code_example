import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import ReactPaginate from 'react-paginate';
import { useRootModel } from '../../models/RootModel';
import Thead from './Thead/Thead';

import styles from './OrdersList.module.scss';
import Trow from './Trow/Trow';
import Loader from '../Loader/Loader';
import SuccessMessage from '../SuccesMessage/SuccessMessage';

const emptyOrdersMessages = {
  PASSED: 'Es wurden keine Aufträge weitergeleitet.',
  ALL: 'Es gibt bisher keine Aufträge.',
  ACTIVE: 'Es wurden bisher keine Aufträge angelegt.',
  COMPLETED: 'Es wurden bisher keine Aufträge abgeschlossen.',
  RECEIVED: 'Es wurden keine Aufträge erhalten.',
};

/**
 * @desc Orders table UI
 * @returns {JSX.Element}
 */
const OrdersList = () => {
  const { orders } = useRootModel();

  const {
    page,
    ordersType,
    isLoading,
    getOrders,
    selectedOrders,
    setSelectedOrders,
    isCheckedAll,
    excludedOrders,
    setExcludedOrders,
    success,
  } = orders;
  const { totalPages, number } = page;

  useEffect(() => {
    orders.getOrders();
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, [ordersType]);

  const onPageChange = async (page) => {
    await getOrders(page.selected);
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  };

  const setOrders = (id) => {
    switch (isCheckedAll) {
      case false:
        if (selectedOrders.includes(id)) {
          const orders = [...selectedOrders];
          orders.splice(orders.indexOf(id), 1);
          setSelectedOrders(orders);
        } else {
          setSelectedOrders([...selectedOrders, id]);
        }
        break;
      case true:
        if (excludedOrders.includes(id)) {
          const orders = [...excludedOrders];
          orders.splice(orders.indexOf(id), 1);
          setExcludedOrders(orders);
        } else {
          setExcludedOrders([...excludedOrders, id]);
        }
        break;
      default:
        break;
    }
  };

  const isPaginationVisible = page.content.length !== 0 && totalPages !== 1;
  const isVisibleNotFound = !isLoading && page.content.length === 0;

  return (
    <div className={styles.container} style={{ overflowX: page?.totalElements ? 'auto' : 'hidden' }}>
      {isLoading && <Loader />}
      <table className={styles.table}>
        <Thead />
        <tbody>
          {page.content &&
            page.content.map((order) => {
              const select = () => {
                if (!isCheckedAll) {
                  return selectedOrders.includes(order.orderId);
                }
                if (isCheckedAll) {
                  const isExcluded = excludedOrders.includes(order.orderId);
                  return !isExcluded;
                }
                return null;
              };
              return (
                <Trow
                  key={order.orderId}
                  isSelected={select()}
                  setSelected={setOrders}
                  order={order}
                  ordersType={ordersType}
                />
              );
            })}
        </tbody>
      </table>
      {isVisibleNotFound && (
        <>
          <div className={styles.text}>{emptyOrdersMessages[ordersType]}</div>
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
      {success.status && <SuccessMessage bottom={isVisibleNotFound ? 0 : 60} />}
    </div>
  );
};

export default observer(OrdersList);
