require('dotenv').config();

const { NODE_ENV, MongoURL } = process.env;
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Joi, celebrate, errors } = require('celebrate');
const bodyParser = require('body-parser');
const limiter = require('./rateLimiter');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({ origin: true }));

const { commonRouter } = require('./routes/index'); // подключаем общий роутер

const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');
const NotFoundError = require('./middlewares/NotFoundError');
const { centralError } = require('./middlewares/centralError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const CONFIG = require('./config.json'); // конфиг для хранения url монго

mongoose.connect(NODE_ENV === 'production' ? MongoURL : CONFIG.mongo_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(limiter); // подключаем rate-limit
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

app.use('/', commonRouter);

app.use('/', () => { // если запросы не верны, выдаем ошибку
  throw new NotFoundError('Запрашиваемой страницы не существует');
});

app.use(errorLogger); // error logger

// обработка ошибок на стадии поверки celebrate
app.use(errors());

// центральный обработчик ошибок
app.use(centralError);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
