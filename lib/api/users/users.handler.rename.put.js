'use strict';

const Boom = require('boom');

module.exports = (server, options, request, reply) => {

  server.plugins.knex.orm('users')
    .where({
      user_pk: request.payload.id,
    }).update({
      name: request.payload.name
    }).then((res) => {

      reply({ message: 'successfully updated user\'s name' });
    }).catch((err) => {

      reply(Boom.badRequest('Error on rename'));
    });
};
