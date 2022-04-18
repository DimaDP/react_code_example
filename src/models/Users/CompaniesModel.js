import { types, flow } from 'mobx-state-tree';
import axios from 'axios';

const CompanyModel = types.model('Company', {
  name: types.optional(types.string, ''),
  id: types.optional(types.number, 0),
});

const CompaniesModel = types
  .model('Companies', {
    isLoading: types.optional(types.boolean, false),
    companies: types.array(CompanyModel),
    alert: types.optional(types.string, ''),
  })
  .actions((self) => ({
    getCompanies: flow(function* getCompanies() {
      self.loading = true;
      try {
        const { data } = yield axios.get('api/companies');
        self.companies = data;
      } catch (e) {
        self.alert = e.response?.data.errorCode || e.message;
      } finally {
        self.isLoading = false;
      }
    }),
  }));

export default CompaniesModel;
