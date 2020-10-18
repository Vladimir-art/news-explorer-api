const article = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

article.get('/', getArticles);

article.post('/', createArticle);

article.delete('/:id', deleteArticle);

module.exports = { article };
