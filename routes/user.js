const user = require('express').Router();
const { getUser } = require('../controllers/user');

user.get('users/me', getUser);

module.exports = { user };
