import React from 'react';
import { addMiddleware, applySnapshot, getSnapshot, types } from 'mobx-state-tree';
import { mstLog } from 'mst-log';
import AuthModel from './AuthModel/AuthModel';
import CompaniesModel from './Users/CompaniesModel';
import UsersModel from './Users/UsersModel';
import UsersSortingModel from './Users/UsersSortingModel';
import OrdersModel from './Orders/OrdersModel';

const RootModel = types
  .model('RootModel', {
    auth: types.optional(AuthModel, {}),
    companies: types.optional(CompaniesModel, {}),
    users: types.optional(UsersModel, {}),
    usersSorting: types.optional(UsersSortingModel, {}),
    orders: types.optional(OrdersModel, {}),
  })
  .actions((self) => {
    let initialState = {};
    return {
      afterCreate: () => {
        initialState = getSnapshot(self);
      },
      reset: () => {
        localStorage.removeItem('TOKEN');
        applySnapshot(self, initialState);
      },
      clearData() {
        applySnapshot(self, initialState);
      },
    };
  });

export const rootStore = RootModel.create({});

if (process.env.NODE_ENV !== 'production') {
  addMiddleware(rootStore, mstLog());
}

export const clearStore = rootStore.reset;

/**
 * RootStore context
 */
export const RootStoreContext = React.createContext(null);

export function useRootModel() {
  const store = React.useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store;
}
