const article = require('express').Router();

article.get('/articles', { someCode });

article.post('/articles', { someCode });

article.delete('/article/:id', { someCode });

module.exports = { article };
