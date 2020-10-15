const bcryptjs = require('bcryptjs'); // password's hash
const validator = require('validator'); // validator
const jwt = require('jsonwebtoken'); // get token

const Article = require('../models/article'); // get user's model

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((u) => res.status(200).send(u))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.body._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(200).send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.id)
    .then((c) => {
      if (c !== null) {
        res.status(200).send(c);
      } else {
        res.status(404).send({ message: 'Данной статьи не существует' });
      }
    })
    .catch(next);
};
