const article = require('express').Router();
const { Joi, celebrate, errors } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

article.get('/', getArticles);

article.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.date().options({ convert: false }).required(),
    source: Joi.string().required(),
    link: Joi.string().uri().required(),
    image: Joi.string().uri().required(),
    owner: Joi.string().hex().required(),
  }),
}), createArticle);

article.delete('/:id', celebrate({
  body: Joi.object().keys({
    id: Joi.string().hex().required(),
  }),
}), deleteArticle);

article.use(errors());

module.exports = { article };
