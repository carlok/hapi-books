'use strict';
const Joi = require('joi');

const renameSchemaPut = {
  params: false,
  query: false,
  payload: {
    id: Joi.number().required(),
    name: Joi.string().required()
  }
};

module.exports = renameSchemaPut;