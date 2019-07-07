import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const items = low(new FileSync('database/items.json'));
const users = low(new FileSync('database/users.json'));

items.defaults({
  items: []
}).write();

const Item = items.get('items');

users.defaults({
  users: []
}).write();

const User = users.get('users');

export {
  Item,
  User
};
