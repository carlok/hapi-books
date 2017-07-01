
exports.up = function (knex, Promise) {

  return knex
    .schema
    .createTable('users', usersTable => {

      // Primary Key
      usersTable.increments();

      // Data
      usersTable.string('guid', 50).notNullable().unique();
      usersTable.string('name', 50).notNullable();
      usersTable.string('username', 50).notNullable().unique();
      usersTable.string('email', 250).notNullable().unique();
      usersTable.string('password', 128).notNullable();

      usersTable.timestamp('created_at').notNullable();

    })

    .createTable('books', booksTable => {

      // Primary Key
      booksTable.increments();
      booksTable.string('author', 36).references('guid').inTable('users');

      // Data
      // Each chainable method creates a column of the given type with
      // the chained constraints.
      // For example, in the line below, we create a column named
      // `title` which has a maximum length of 250 characters, is of type
      // string (VARCHAR) and is not nullable.
      booksTable.string('guid', 36).notNullable().unique();
      booksTable.string('title', 250).notNullable();
      booksTable.string('publisher', 250).notNullable();
      booksTable.string('picture_url', 250).notNullable();
      booksTable.boolean('isPublic').notNullable().defaultTo(true);

      booksTable.timestamp('created_at').notNullable();
    });

};

exports.down = function(knex, Promise) {

    // We use `...ifExists` because we're not sure if the table's there.
    // Honestly, this is just a safety measure.
    return knex
        .schema
            .dropTableIfExists( 'books' )
            .dropTableIfExists( 'users' );

};
