import { types as t, flow, getSnapshot } from 'mobx-state-tree';
import axios from 'axios';
import PageModel from './PageModel';
import User from './UserModel';

const UsersModel = t
  .model('Users', {
    companyFilter: t.optional(t.maybeNull(t.number), null),
    nameFilter: t.optional(t.string, ''),
    isLoading: t.optional(t.boolean, false),
    alert: t.optional(t.string, ''),
    page: t.optional(PageModel, {}),
    selectedUser: t.optional(User, {}),
  })
  .actions((self) => ({
    selectUser(user) {
      self.selectedUser = getSnapshot(user);
    },
    getUsers: flow(function* getUsers(page, sort) {
      self.isLoading = true;
      try {
        const config = {
          params: {
            companyId: self.companyFilter,
            search: self.nameFilter,
            page,
            sort,
          },
        };
        const { data } = yield axios.get('/api/users', config);
        self.page = data;
      } catch (e) {
        self.alert = e.response?.data.errorCode || e.message;
      } finally {
        self.isLoading = false;
      }
    }),
    setCompanyFilter(companyId) {
      self.companyFilter = companyId;
    },
    setNameFilter(name) {
      self.nameFilter = name;
    },
  }));

export default UsersModel;
