'use strict';

const usersSchemaAuthPost = require('./users.schema.auth.post');
const usersSchemaRenamePut = require('./users.schema.rename.put');

const usersHandlerAuthPost = require('./users.handler.auth.post');
const usersHandlerPublicGet = require('./users.handler.public.get');
const usersHandlerRenamePut = require('./users.handler.rename.put');

/*
http -j --verbose POST http://127.0.0.1:1337/api/v1/users/auth username="muser" password="password"
http --auth-type=jwt --auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDk5MTYyMjM0LCJleHAiOjE0OTk1MDc4MzR9.EWdlIylzBvXtqebCLlTafbQ3F9PSvX0ZHg70kptyxG8:' -j --verbose PUT http://127.0.0.1:1337/api/v1/users/rename id=1 name="Fede"
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
