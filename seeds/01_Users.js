
exports.seed = function seed(knex, Promise) {
  const tableName = 'users';

  const rows = [
    {
      name: 'Carlo Perassi',
      username: 'muser',
      password: 'mpwd',
      email: 'carlo.perassi@aaa.it'
    }
  ];

  return knex(tableName)
    // Empty the table (DELETE)
    .del()
    .then(() => knex.insert(rows).into(tableName));
};
