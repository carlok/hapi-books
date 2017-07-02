'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Jwt = require('jsonwebtoken');

const renamePutSchema = require('./rename.schema.put');

/*
http --auth-type=jwt --auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDk4OTQ2MjY0LCJleHAiOjE0OTkyOTE4NjR9.JG5sLjaSt5uk_LO54PmpMwZ0ufE6tcg66GoKhH72u9E:' -j --verbose GET http://127.0.0.1:1337/api/v1/users/restricted

http -j --verbose POST http://127.0.0.1:1337/api/v1/users/auth username="muser" password="pwd"

http --auth-type=jwt --auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDk4OTQ2MjY0LCJleHAiOjE0OTkyOTE4NjR9.JG5sLjaSt5uk_LO54PmpMwZ0ufE6tcg66GoKhH72u9E:' -j --verbose PUT http://127.0.0.1:1337/api/v1/users/rename id=1 name="Fede"
*/

const Users = exports.register = function (server, options, next) {

    const publicGetHandler = (request, reply) => {

        reply({ text: 'Token not required' });
    };

    const authPostHandler = (request, reply) => {

        function getToken(id) {
            return Jwt.sign({
                id: id
            }, options.secretKey, { expiresIn: '96h' });
        }

        server.plugins.knex.orm('users')
            .select('user_pk')
            .where({
                username: request.payload.username,
                password: request.payload.password
            })
            .then(user => {

                if (user.length == 1) {
                    reply({ token: getToken(user[0].user_pk) });
                } else {
                    reply(Boom.badRequest({ message: 'Unknown user' }));
                }
            })
            .catch(err => {
                reply(Boom.badRequest({ message: 'Error on auth' }));
            });
    };

    const renamePutHandler = (request, reply) => {

        server.plugins.knex.orm('users')
            .where({
                user_pk: request.payload.id,
            }).update({
                name: request.payload.name
            }).then((res) => {

                reply({ message: 'successfully updated user\'s name' });
            }).catch((err) => {

                reply(Boom.badRequest({ message: 'Error on rename' }));
            });
    };

    require('./users.handler.rename.put')

    server.route([
        {
            method: 'GET',
            path: '/public',
            config: {
                auth: false
            },
            handler: publicGetHandler
        },
        {
            method: 'POST',
            path: '/auth',
            config: {
                auth: false
            },
            handler: authPostHandler
        },
        {
            method: 'PUT',
            path: '/rename',
            config: {
                validate: renamePutSchema
            },
            handler: renamePutHandler
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'users'
};
