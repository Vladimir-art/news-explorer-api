const mongoose = require('mongoose');
const validator = require('validator');

const articleSchema = mongoose.Schema({
  keyword: {
    type: String,
    requred: true,
  },
  title: {
    type: String,
    requred: true,
  },
  text: {
    type: String,
    requred: true,
  },
  date: {
    type: String,
    require: true,
    validate: {
      validator(str) {
        return validator.isDate(str, { format: 'DD.MM.YYYY' });
      },
      message: 'Неверный формат даты: ДД.ММ.ГГГГ',
    },
  },
  source: {
    type: String,
    requred: true,
  },
  link: {
    type: String,
    requred: true,
    validate: {
      validator(str) {
        return validator.isURL(str);
      },
      message: 'Нeверный формат ссылки',
    },
  },
  image: {
    type: String,
    requred: true,
    validate: {
      validator(str) {
        return validator.isURL(str);
      },
      message: 'Это не ссылка на изображение...',
    },
  },
  owner: {
    type: String,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
