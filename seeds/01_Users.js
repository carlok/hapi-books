
exports.seed = function seed(knex, Promise) {
  const tableName = 'users';

  const rows = [
    // You are free to add as many rows as you feel like in this array. Make sure that they're an object containing the following fields:
    {
      name: 'Carlo Perassi',
      username: 'muser',
      password: 'mpwd',
      email: 'carlo.perassi@aaa.it',
      guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
    },

  ];

  return knex(tableName)
    // Empty the table (DELETE)
    .del()
    .then(() => knex.insert(rows).into(tableName));
};