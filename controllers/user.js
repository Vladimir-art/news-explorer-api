const validator = require('validator'); // validator
const jwt = require('jsonwebtoken'); // get token

const User = require('../models/user'); // get user's model

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((u) => res.status(200).send(u))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.create({ name, email, password })
    .then((user) => res.status(200).send(user))
    .catch({ message: 'Что-то пошло не так в User' });
};
