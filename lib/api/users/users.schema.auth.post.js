'use strict';

const Joi = require('joi');

const schemaAuthPost = {
  params: false,
  query: false,
  payload: {
    username: Joi.string().required(),
    password: Joi.string().required()
  }
};

module.exports = schemaAuthPost;