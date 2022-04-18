import { types as t } from 'mobx-state-tree';
import User from '../Users/UserModel';

const UsersPageModel = t.model('UsersPageModel', {
  content: t.optional(t.array(User), []),
  pageable: t.optional(
    t.model({
      sort: t.optional(
        t.model({
          empty: t.optional(t.boolean, false),
          sorted: t.optional(t.boolean, false),
          unsorted: t.optional(t.boolean, false),
        }),
        {},
      ),
      offset: t.optional(t.number, 0),
      pageNumber: t.optional(t.number, 0),
      pageSize: t.optional(t.number, 0),
      paged: t.optional(t.boolean, false),
      unpaged: t.optional(t.boolean, false),
    }),
    {},
  ),
  totalPages: t.optional(t.number, 0),
  totalElements: t.optional(t.number, 0),
  last: t.optional(t.boolean, false),
  size: t.optional(t.number, 0),
  number: t.optional(t.number, 0),
  sort: t.optional(
    t.model({
      empty: t.optional(t.boolean, false),
      sorted: t.optional(t.boolean, false),
      unsorted: t.optional(t.boolean, false),
    }),
    {},
  ),
  numberOfElements: t.optional(t.number, 0),
  first: t.optional(t.boolean, false),
  empty: t.optional(t.boolean, false),
});

export default UsersPageModel;
