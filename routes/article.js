const article = require('express').Router();
const { Joi, celebrate, errors, Segments } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

article.get('/', getArticles);

article.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().uri().required(),
    image: Joi.string().uri().required(),
  }),
}), createArticle);

article.delete('/:id', deleteArticle);

article.use(errors());

module.exports = { article };
