'use strict';

const Blipp = require('blipp');
const Env = require('node-env-file');
const Hapi = require('hapi');

// out extensions
const OnPreHandler = require('./extensions/onprehandler');

Env(__dirname + './../.env');

// our support plugins
const Bookshelf = require('./plugins/hapi-bookshelf');
const Knex = require('./plugins/hapi-knex');

// our routes plugins
const Users = require('./api/users/users.route');

const server = new Hapi.Server();
server.connection({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: { cors: true }
});

const validate = function (jwtDecoded, request, callback) {
    server.plugins.knex.orm('users')
        .select('user_pk')
        .where({
            user_pk: jwtDecoded.id
        })
        .then(user => {

            if (user.length) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        })
        .catch(error => {

            callback(error);
        });
};

const db_options = {
    client: 'mysql',
    connection: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    pool: {
        min: 2,
        max: 10
    }
};

server.register([
    // supports
    { register: Bookshelf, options: db_options },
    { register: Knex, options: db_options },
    require('hapi-auth-jwt2'),

    // extensions
    { register: OnPreHandler, options: {}, routes: { prefix: process.env.PREFIX } },

    // APIs
    {
        register: Users,
        options: { secretKey: process.env.JWT_SECRET_KEY },
        routes: { prefix: process.env.PREFIX + '/users' }
    },

    // third parties
    Blipp
], (err) => {

    if (err) {
        console.log(err);
    }

    server.auth.strategy('jwt', 'jwt', true, {
        // so with the previous "true", JWT auth is required for all routes
        // by default
        key: process.env.JWT_SECRET_KEY,
        validateFunc: validate,
        verifyOptions: { ignoreExpiration: false, algorithms: ['HS256'] }
    });

});

server.start((serverError) => {

    (serverError !== undefined) ? console.log(serverError) : null;
    console.log(`Server running at ${server.info.uri}`);
});

module.exports = server;