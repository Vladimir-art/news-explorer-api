const { JWT_SECRET = 'dev-secret' } = process.env;
const bcryptjs = require('bcryptjs'); // password's hash
const jwt = require('jsonwebtoken'); // get token
const BadRequestError = require('../middlewares/BadRequestError');
const UnauthorizedError = require('../middlewares/UnauthorizedError');
const ConflictError = require('../middlewares/ConflictError');

const User = require('../models/user'); // get user's model

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((u) => res.status(200).send({ name: u.name, email: u.email }))
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
            next(new ConflictError('Такой пользователь уже существует'));
          }
          next(new BadRequestError('Ошибка создания пользователя'));
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Такого пользователя не существует'); // 401 ошибка
      }
      return bcryptjs.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неверная почта или пароль'); // 401 ошибка
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
