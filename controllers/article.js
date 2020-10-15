const bcryptjs = require('bcryptjs'); // password's hash
const validator = require('validator'); // validator
const jwt = require('jsonwebtoken'); // get token

const Article = require('../models/article'); // get user's model

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((u) => res.status(200).send(u))
    .catch(next);
};
