const article = require('express').Router();
const { Joi, celebrate, errors } = require('celebrate');
const validator = require('validator');
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

article.get('/', getArticles);

article.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.massage('Поле ссылка заполнено некорректно');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.massage('Поле картинка заполнено некорректно');
    }),
  }),
}), createArticle);

article.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
}), deleteArticle);

article.use(errors());

module.exports = { article };
