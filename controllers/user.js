const { JWT_SECRET = 'dev-secret' } = process.env;
const bcryptjs = require('bcryptjs'); // password's hash
const jwt = require('jsonwebtoken'); // get token

const User = require('../models/user'); // get user's model

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((u) => res.status(200).send(u))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs.hash(password, 10)
    .then((hash) => {
      User.create({ name, email, password: hash })
        .then((user) => res.status(200).send({ name: user.name, email: user.email }))
        .catch((err) => {
          if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(409).send({ message: 'Такой пользователь уже существует' });
          }
          return res.status(400).send({ message: 'Ошибка создания пользователя' });
        });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Такого пользователя не существует'));
      }
      return bcryptjs.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неверный пароль'));
          }
          return user;
        });
    })
    .then((verifiedUser) => {
      const token = jwt.sign({ _id: verifiedUser._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => res.status(401).send({ message: err.message }));
};
