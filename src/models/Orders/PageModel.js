import { types as t } from 'mobx-state-tree';
import OrderModel from './OrderModel';

const PageModel = t.model({
  type: t.optional(t.string, 'ALL'),
  content: t.optional(t.array(OrderModel), []),
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

export default PageModel;
