exports.seed = function seed(knex, Promise) {
  const tableName = 'books';

  const rows = [
    {
      users_user_fk: 1,
      title: 'Pigeon'
    },

    {
      users_user_fk: 1,
      title: 'Mourning dove'
    }
  ];

  return knex(tableName)
    .del()
    .then(() => knex.insert(rows).into(tableName));
};