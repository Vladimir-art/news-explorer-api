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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
