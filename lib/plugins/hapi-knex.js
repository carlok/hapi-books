'use strict';

exports.register = function (server, options, next) {

  server.expose({
    orm: require('knex')(options)
  });

  next();
};

exports.register.attributes = {
  name: 'knex'
};