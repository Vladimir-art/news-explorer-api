const express = require('express');
const mongoose = require('mongoose');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
const bodyParser = require('body-parser');
const { article } = require('./routes/article');
const { user } = require('./routes/user');
const { createUser } = require('./controllers/user');

mongoose.connect('mongodb://localhost:27017/diplomdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);

app.use('/', user);
app.use('/', article);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
