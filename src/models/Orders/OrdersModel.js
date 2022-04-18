import { types as t, flow, getParent, getSnapshot, applySnapshot } from 'mobx-state-tree';
import axios from 'axios';
import PageModel from './PageModel';
import UsersPageModel from './UsersPageModel';

const OrdersModel = t
  .model('OrdersModel', {
    page: t.optional(PageModel, {}),
    isLoading: t.optional(t.boolean, false),
    ordersType: t.optional(t.string, 'ALL'),
    alert: t.optional(t.string, ''),
    selectedOrders: t.optional(t.array(t.number), []),
    excludedOrders: t.optional(t.array(t.number), []),
    isActivePassOrderMenu: t.optional(t.boolean, false),
    users: t.optional(UsersPageModel, {}),
    usersIsLoading: t.optional(t.boolean, false),
    search: t.optional(t.string, ''),
    isCheckedAll: t.optional(t.boolean, false),
    isActiveReverseModal: t.optional(t.boolean, false),
    ordersCounter: t.optional(
      t.array(
        t.model({
          status: t.optional(t.string, ''),
          total: t.optional(t.number, 0),
        }),
      ),
      [],
    ),
    success: t.optional(
      t.model({
        status: t.optional(t.boolean, false),
        message: t.optional(t.string, ''),
      }),
      {},
    ),
  })
  .actions((self) => {
    let initialState = {};
    return {
      afterCreate: () => {
        initialState = getSnapshot(self);
      },
      clearData() {
        applySnapshot(self, initialState);
      },
      setSuccess(status) {
        self.success = status;
      },
      getUsers: flow(function* getUsers(page, search) {
        self.usersIsLoading = true;
        try {
          const config = {
            params: {
              search,
              page,
            },
          };
          const { data } = yield axios.get(`/api/users/search`, config);
          self.users = data;
          return data.content;
        } catch (e) {
          self.alert = e.response?.data.errorCode || e.message;
        } finally {
          self.usersIsLoading = false;
        }
        return null;
      }),
      getOrders: flow(function* getOrders(page) {
        self.isLoading = true;
        try {
          const {
            users: { selectedUser },
          } = getParent(self);
          const config = {
            params: {
              orderStatus: self.ordersType,
              page,
            },
          };
          const {
            data: { orders, totalElements },
          } = yield axios.get(`/api/orders/user/${selectedUser.id}`, config);
          self.page = { ...orders, type: self.ordersType };
          self.ordersCounter = totalElements;
        } catch (e) {
          self.alert = e.response?.data.errorCode || e.message;
        } finally {
          self.isLoading = false;
        }
      }),
      changeStatus(status) {
        self.selectedOrders = [];
        self.excludedOrders = [];
        self.isActivePassOrderMenu = false;
        self.isCheckedAll = false;
        self.ordersType = status;
      },
      setSelectedOrders(newOrders) {
        if (newOrders.length === 0) {
          self.isActivePassOrderMenu = false;
        }
        self.selectedOrders = newOrders;
      },
      setExcludedOrders(newOrders) {
        if (newOrders.length === self.page.totalElements) {
          self.isActivePassOrderMenu = false;
        }
        self.excludedOrders = newOrders;
      },
      setActivePassOrderMenu(isActive) {
        self.isActivePassOrderMenu = isActive;
      },
      setSearch(e) {
        self.search = e.target.value;
      },
      passOrders: flow(function* passOrders({ fromUserId, toUserId, temporary }) {
        self.usersIsLoading = true;
        try {
          const body = {
            fromUserId,
            orderIds: [...self.selectedOrders],
            temporary,
            toUserId,
          };
          const { data } = yield axios.post(`/api/orders/user/pass`, body);
          self.success = {
            status: true,
            message: `${self.selectedOrders.length} Bestellungen wurden erfolgreich weitergegeben`,
          };
          return data;
        } catch (e) {
          self.alert = e.response?.data.errorCode || e.message;
        } finally {
          self.usersIsLoading = false;
          self.selectedOrders = [];
          self.excludedOrders = [];
          self.isCheckedAll = false;
        }
        return null;
      }),
      passOrdersForAll: flow(function* passOrdersForAll({ fromUserId, toUserId, temporary }) {
        self.usersIsLoading = true;
        try {
          const body = {
            fromUserId,
            excludedOrders: [...self.excludedOrders],
            status: self.ordersType,
            temporary,
            toUserId,
          };
          const { data } = yield axios.post(`/api/orders/user/pass/all`, body);
          self.success = {
            status: true,
            message: `${
              self.page.totalElements - self.excludedOrders.length
            } Bestellungen wurden erfolgreich weitergegeben`,
          };
          return data;
        } catch (e) {
          self.alert = e.response?.data.errorCode || e.message;
        } finally {
          self.usersIsLoading = false;
          self.selectedOrders = [];
          self.excludedOrders = [];
          self.isCheckedAll = false;
        }
        return null;
      }),
      restoreOrders: flow(function* restoreOrders({ toUserId }) {
        self.usersIsLoading = true;
        try {
          const body = {
            orderIds: [...self.selectedOrders],
            toUserId,
          };
          const { data } = yield axios.post(`/api/orders/user/return`, body);
          self.success = {
            status: true,
            message: `${self.selectedOrders.length} Aufträge erfolgreich wiederhergestellt`,
          };
          return data;
        } catch (e) {
          self.alert = e.response?.data.errorCode || e.message;
        } finally {
          self.usersIsLoading = false;
          self.selectedOrders = [];
          self.excludedOrders = [];
          self.isCheckedAll = false;
        }
        return null;
      }),
      restoreOrdersForAll: flow(function* restoreOrdersForAll({ toUserId }) {
        self.usersIsLoading = true;
        try {
          const body = {
            excludedOrders: [...self.excludedOrders],
            toUserId,
          };
          const { data } = yield axios.post(`/api/orders/user/return/all`, body);
          self.success = {
            status: true,
            message: `${self.page.totalElements - self.excludedOrders.length} orders are successfully restored.`,
          };
          return data;
        } catch (e) {
          self.alert = e.response?.data.errorCode || e.message;
        } finally {
          self.usersIsLoading = false;
          self.selectedOrders = [];
          self.excludedOrders = [];
          self.isCheckedAll = false;
        }
        return null;
      }),
      setCheckedAll() {
        self.isCheckedAll = !self.isCheckedAll;
        if (self.isCheckedAll) {
          self.selectedOrders = [];
        } else {
          self.excludedOrders = [];
          self.isActivePassOrderMenu = false;
        }
      },
      toggleReverseModal() {
        self.isActiveReverseModal = !self.isActiveReverseModal;
      },
      getCounter(status) {
        return self.ordersCounter.find((item) => item.status === status)?.total || 0;
      },
    };
  });

export default OrdersModel;
