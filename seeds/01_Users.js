
exports.seed = function seed(knex, Promise) {
  const tableName = 'users';

  const rows = [
    {
      name: 'Carlo Perassi',
      username: 'muser',
      // password
      password: '$2a$10$BBKVqfDpiYzfRYUK0sVmOePz9ntg8AkItGOqW1xZARxmG2evYXy82',
      email: 'carlo.perassi@aaa.it'
    }
  ];

  return knex(tableName)
    // Empty the table (DELETE)
    .del()
    .then(() => knex.insert(rows).into(tableName));
};
