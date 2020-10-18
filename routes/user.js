const user = require('express').Router();
const { getUser } = require('../controllers/user');

user.get('/me', getUser);

module.exports = { user };
