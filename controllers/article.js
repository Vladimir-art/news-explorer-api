const Article = require('../models/article'); // get user's model
const NotFoundError = require('../middlewares/NotFoundError');
const UnauthorizedError = require('../middlewares/UnauthorizedError');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((u) => res.status(200).send(u))
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.status(200).send(article))
    .catch(next);
};

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).select('+owner')
    .then((c) => {
      if (c !== null) {
        if (c.owner.toString() === req.user._id) {
          Article.deleteOne(c)
            .then(() => res.status(200).send({ message: 'Статья удалена' }))
            .catch(next);
        } else {
          throw new UnauthorizedError('Это не Ваша статья. Удалить нельзя');
        }
      } else {
        throw new NotFoundError('Данной статьи не существует');
      }
    })
    .catch(next);
};
