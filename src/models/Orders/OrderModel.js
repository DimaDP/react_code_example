import { types as t } from 'mobx-state-tree';

const OrderModel = t.model({
  orderId: t.optional(t.number, 0),
  clientName: t.optional(t.string, ''),
  distributor: t.optional(t.string, ''),
  price: t.optional(t.number, 0),
  reservationDate: t.maybeNull(t.string),
  createdAt: t.maybeNull(t.string),
  closedDate: t.maybeNull(t.string),
  passedTo: t.maybeNull(t.string),
  receivedFrom: t.maybeNull(t.string),
  completed: t.optional(t.boolean, false),
  article: t.optional(t.string, ''),
});

export default OrderModel;
