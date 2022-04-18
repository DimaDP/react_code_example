import { types as t } from 'mobx-state-tree';

const User = t.model('User', {
  id: t.optional(t.number, 0),
  phone: t.optional(t.string, ''),
  name: t.optional(t.string, ''),
  companies: t.optional(t.array(t.string), []),
});

export default User;
