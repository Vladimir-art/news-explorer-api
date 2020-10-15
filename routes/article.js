const article = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

article.get('/articles', getArticles);

article.post('/articles', createArticle);

article.delete('/article/:id', deleteArticle);

module.exports = { article };
