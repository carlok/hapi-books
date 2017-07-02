'use strict';

const Joi = require('joi');

const schemaRenamePut = {
  params: false,
  query: false,
  payload: {
    id: Joi.number().required(),
    name: Joi.string().required()
  }
};

module.exports = schemaRenamePut;