'use strict';

exports.register = function (server, options, next) {

  const Knex = require('knex')(options);

  server.expose({
    orm: require('bookshelf')(Knex)
  });

  next();
};

exports.register.attributes = {
  name: 'bookshelf'
};
