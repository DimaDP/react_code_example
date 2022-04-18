import { flow, types } from 'mobx-state-tree';
import axios from 'axios';

const AuthModel = types
  .model('AuthModel', {
    email: types.optional(types.string, ''),
    isLoading: types.optional(types.boolean, false),
    alert: types.optional(types.string, ''),
    isRemember: types.optional(types.boolean, false),
    token: types.optional(types.string, ''),
    password: types.optional(types.string, ''),
    isAuthenticated: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    setEmail(email) {
      self.email = email.slice(0, 25);
      self.alert = '';
    },

    setPassword(password) {
      self.password = password.slice(0, 25);
      self.alert = '';
    },

    setRememberMe() {
      self.isRemember = !self.isRemember;
    },

    setIsLoading(isLoading) {
      self.isLoading = isLoading;
    },
    setAlert(message) {
      self.alert = message;
    },
    setIsAuthenticated(isAuthenticated) {
      self.isAuthenticated = isAuthenticated;
    },
    login: flow(function* login() {
      self.isLoading = true;
      try {
        const config = {
          password: self.password,
          username: self.email,
          rememberMe: self.isRemember,
        };
        const { data } = yield axios.post('/api/login/username', config);

        if (data.token) {
          localStorage.setItem('TOKEN', data.token);
          self.isAuthenticated = true;
        }
      } catch (e) {
        self.alert = e.response?.data.errorCode || e.message;
      } finally {
        self.isLoading = false;
      }
    }),
    clearAlert() {
      self.alert = '';
    },
  }));

export default AuthModel;
