'use strict';

const Jwt = require('jsonwebtoken');

/*
http --auth-type=jwt --auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDk4OTQ2MjY0LCJleHAiOjE0OTkyOTE4NjR9.JG5sLjaSt5uk_LO54PmpMwZ0ufE6tcg66GoKhH72u9E:' -j --verbose GET http://127.0.0.1:1337/api/v1/users/restricted

http -j --verbose POST http://127.0.0.1:1337/api/v1/users/auth username="muser" password="pwd"

http --auth-type=jwt --auth='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNDk4OTQ2MjY0LCJleHAiOjE0OTkyOTE4NjR9.JG5sLjaSt5uk_LO54PmpMwZ0ufE6tcg66GoKhH72u9E:' -j --verbose PUT http://127.0.0.1:1337/api/v1/users/rename id=1 name="Fede"
*/

const Users = exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/public',
            config: { auth: false },
            handler: function (request, reply) {
                reply({ text: 'Token not required' });
            }
        },
        {
            method: 'POST',
            path: '/auth',
            config: { auth: false },
            handler: function (request, reply) {
                function getToken(id) {
                    return Jwt.sign({
                        id: id
                    }, options.secretKey, { expiresIn: '96h' });
                }

                server.plugins.knex.orm('users')
                    .select('id')
                    .where({
                        username: request.payload.username,
                        password: request.payload.password
                    })
                    .then(user => {

                        if (user.length == 1) {
                            reply({ token: getToken(user[0].id) });
                        } else {
                            reply(); // it should "boom"
                        }
                    })
                    .catch(err => {
                        reply(); // it should "boom"
                    });

                // only for testing purposes, of course
                /*if (request.payload.name === 'Jen Jones') {
                    const userId = 1;
                    reply({ token: getToken(userId) });
                } else {
                    reply(); // it should "boom"
                }*/
            }
        },
        {
            method: 'GET',
            path: '/restricted',
            handler: function (request, reply) {
                reply({ text: 'You used a Token!' })
                    .header('Authorization', request.headers.authorization);
            }
        },
        {
            method: 'PUT',
            path: '/rename',
            handler: function (request, reply) {

                server.plugins.knex.orm('users')
                    .where({
                        id: request.payload.id,
                    }).update({
                        name: request.payload.name
                    }).then((res) => {

                        reply({ message: 'successfully updated user\'s name' });
                    }).catch((err) => {

                        reply('server-side error');
                    });
            }
        },
    ]);

    next();
};

exports.register.attributes = {
    name: 'users'
};
