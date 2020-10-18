const { JWT_SECRET = 'dev-secret' } = process.env;
const bcryptjs = require('bcryptjs'); // password's hash
const jwt = require('jsonwebtoken'); // get token
const CentralError = require('../middlewares/CentralError');

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
            throw new CentralError('Такой пользователь уже существует', 409);
          }
          throw new CentralError('Ошибка создания пользователя', 400);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new CentralError('Такого пользователя не существует', 404);
      }
      return bcryptjs.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new CentralError('Неверная почта или пароль', 400);
          }
          return user;
        });
    })
    .then((verifiedUser) => {
      const token = jwt.sign({ _id: verifiedUser._id }, JWT_SECRET, { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch(next);
};
