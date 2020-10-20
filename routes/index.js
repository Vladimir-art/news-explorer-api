const commonRouter = require('express').Router();
const { article } = require('./article');
const { user } = require('./user');

commonRouter.use('/users', user);
commonRouter.use('/articles', article);

module.exports = { commonRouter };
