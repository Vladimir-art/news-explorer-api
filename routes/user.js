const user = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser } = require('../controllers/user');

user.get('/me', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
}), getUser);

module.exports = { user };
