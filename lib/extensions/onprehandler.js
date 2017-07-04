'use strict';

const Boom = require('boom');

exports.register = function (server, options, next) {

    server.ext('onPreHandler', function (request, reply) {
        // some hints if you wan to make an ACL system...
        // console.log('onPreHandler', request);
        return reply.continue();
    });

    next();
};

exports.register.attributes = {
    name: 'onprehandler'
};