'use strict';

const Bcrypt = require('bcrypt');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');

module.exports = (server, options, request, reply) => {

  function getToken(id) {
    return Jwt.sign({
      id: id
    }, options.secretKey, { expiresIn: '96h' });
  }

  server.plugins.knex.orm('users')
    .select('user_pk', 'username', 'password')
    .where({
      username: request.payload.username
    })
    .then(user => {

      if (user.length == 1) {
        Bcrypt.compare(request.payload.password, user[0].password)
          .then(res => {

            if (res === true) {
              reply({ token: getToken(user[0].user_pk) });
            } else {
              reply(Boom.badRequest('Wrong password'));
            }
          });
      } else {
        reply(Boom.badRequest('Unknown user'));
      }
    })
    .catch(err => {
      reply(Boom.badRequest('Error on auth'));
    });
};
