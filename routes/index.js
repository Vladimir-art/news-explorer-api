const commonRouter = require('express').Router();
const { article } = require('./article');
const { user } = require('./user');

// Все роуты подключены в файле index.js, который находится в папке routes.
commonRouter.use('/users', user);
commonRouter.use('/articles', article);

module.exports = { commonRouter };
