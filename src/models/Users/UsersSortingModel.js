import { types as t } from 'mobx-state-tree';

const UsersSortingModel = t
  .model({
    name: t.optional(
      t.model({
        order: t.optional(t.string, 'asc'),
        isActive: t.optional(t.boolean, false),
      }),
      {},
    ),
  })
  .actions((self) => ({
    setNameSorting() {
      const isActive = true;
      let order;
      if (self?.name?.order === 'asc') {
        order = 'desc';
      } else {
        order = 'asc';
      }
      self.name = { ...self.name, isActive, order };
    },
  }));

export default UsersSortingModel;
