'use strict';

const usersSchemaAuthPost = require('./users.schema.auth.post');
const usersSchemaRenamePut = require('./users.schema.rename.put');

const usersHandlerAuthPost = require('./users.handler.auth.post');
const usersHandlerPublicGet = require('./users.handler.public.get');
const usersHandlerRenamePut = require('./users.handler.rename.put');

/*
http --auth-type=jwt --auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDk4OTQ2MjY0LCJleHAiOjE0OTkyOTE4NjR9.JG5sLjaSt5uk_LO54PmpMwZ0ufE6tcg66GoKhH72u9E:' -j --verbose GET http://127.0.0.1:1337/api/v1/users/restricted
http -j --verbose POST http://127.0.0.1:1337/api/v1/users/auth username="muser" password="$2a$10$BBKVqfDpiYzfRYUK0sVmOePz9ntg8AkItGOqW1xZARxmG2evYXy82"
http --auth-type=jwt --auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDk5MDM4MTAxLCJleHAiOjE0OTkzODM3MDF9.FI_MQC7r2Az0qYqePdi3XoDyJKzaip-jucG6Vj8f94o:' -j --verbose PUT http://127.0.0.1:1337/api/v1/users/rename id=1 name="Fede"
*/

const Users = exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/public',
            config: { auth: false },
            handler: (request, reply) =>
                usersHandlerPublicGet(server, options, request, reply)
        },
        {
            method: 'POST',
            path: '/auth',
            config: {
                auth: false,
                validate: usersSchemaAuthPost
            },
            handler: (request, reply) =>
                usersHandlerAuthPost(server, options, request, reply)
        },
        {
            method: 'PUT',
            path: '/rename',
            config: { validate: usersSchemaRenamePut },
            handler: (request, reply) =>
                usersHandlerRenamePut(server, options, request, reply)
        }
    ]);

    next();
};

exports.register.attributes = {
    name: 'users'
};
