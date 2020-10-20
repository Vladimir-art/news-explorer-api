const article = require('express').Router();
const { Joi, celebrate, errors } = require('celebrate');
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

article.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  }),
}), deleteArticle);

article.use(errors());

module.exports = { article };


// {
//   "keyword": "8888888888888",
//   "title": "88888888888",
//   "text": "cdfdgd111111gcljcnsdfgjhbfv",
//   "date": "23.01.2020",
//   "source": "https://www.npmjs.com/packfvsfvage/celebrate",
//   "link": "https://www.npmjs.com/package/celebrate",
//   "image": "https://www.npmjs.com/package/celebrate"
// }
