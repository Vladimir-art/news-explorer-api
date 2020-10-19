require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { Joi, celebrate, errors } = require('celebrate');
const bodyParser = require('body-parser');
// Слушаем 3000 порт
const { PORT } = process.env;

const app = express();

const { article } = require('./routes/article');
const { user } = require('./routes/user');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const CentralError = require('./middlewares/CentralError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://localhost:27017/diplomdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger); // rquest logger

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).unknown(true),
}), login);

app.use(auth);

app.use('/users', user);
app.use('/articles', article);
app.use('/', (req, res, next) => { // если запросы не верны, выдаем ошибку
  throw new CentralError('Запрашиваемой страницы не существует', 404);
});

app.use(errorLogger); // error logger

// обработка ошибок на стадии поверки celebrate
app.use(errors());

app.use((err, req, res, next) => {
  console.log(err.statusCode, 'hiii ', err.message);
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
