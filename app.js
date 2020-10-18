require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
const bodyParser = require('body-parser');
const { article } = require('./routes/article');
const { user } = require('./routes/user');
const { createUser, login } = require('./controllers/user');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/diplomdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth);

app.use('/users', user);
app.use('/articles', article);
app.use('/', (req, res, next) => { // если запросы не верны, выдаем ошибку
  res.status(404).send({ message: 'Запрашиваемом страницы не существует' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
