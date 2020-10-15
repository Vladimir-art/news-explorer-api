const validator = require('validator'); // validator
const jwt = require('jsonwebtoken'); // get token

const User = require('../models/user'); // get user's model

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((u) => res.status(200).send(u))
    .catch(next);
};
