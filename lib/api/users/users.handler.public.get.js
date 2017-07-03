'use strict';

const Boom = require('boom');

module.exports = (server, options, request, reply) => {

    // with Bookshelf
    const booksModel = require('../../models/books.model')(server.plugins.bookshelf);

    booksModel.findAll()
        .then(books => {
            reply(books);
        })
        .catch(err => {
            reply(Boom.badRequest('No...'));
        });
};