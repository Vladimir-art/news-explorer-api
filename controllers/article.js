const Article = require('../models/article'); // get user's model
const CentralError = require('../middlewares/CentralError');

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
  let y = req.user._id;
  Article.findById(req.params.id).select('+owner')
    .then((c) => {
      if (c !== null) {
        console.log(typeof y, y, c.owner._id.toString(), c.owner.toString() === req.user._id);
        if (c.owner.toString() === req.user._id) {
          Article.deleteOne(c)
            .then((card) => res.status(200).send(card))
            .catch(next);
        } else {
          res.status(400).send("You don't have this article");
        }
      }
    })
    .catch(next);
  // Article.findByIdAndRemove(req.params.id).select('+owner')
  //   .then((c) => {
  //     if (c !== null) {

  //       console.log(typeof y, y, c.owner._id.toString(), c.owner.toString() === req.user._id);
  //       next(new CentralError("You don't have this article", 404));
  //       // if (c.owner._id.toString() === req.user._id) {
  //       //   res.status(200).send(c);
  //       // } else {
  //       //   next(new CentralError("You don't have this article", 404));
  //       //   // res.status(400).send("You don't have this article");
  //       // }
  //     } else {
  //       next(new CentralError('Данной статьи не существует', 404));
  //     }
  //   })
  //   .catch(next);
};

//5f8e014ef6c4150af8796446 -- hp
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjhkZDczMWM4NDRiNjFjN2NkMWZlNDQiLCJpYXQiOjE2MDMxMzEyMDQsImV4cCI6MTYwMzczNjAwNH0.tjsCd_x0yGbD_5ndPWvTYKzGsJpUY8KGa1-b8Ugm3f4
//5f8debecce270f216c269b22
// {
//   "keyword": "vhbf223jvhbdfk",
//   "title": "vjhbdcddcdvfjhvb",
//   "text": "cdfdgd111111gcljcnsdfgjhbfv",
//   "date": "23.01.2020",
//   "source": "https://www.npmjs.com/packfvsfvage/celebrate",
//   "link": "https://www.npmjs.com/package/celebrate",
//   "image": "https://www.npmjs.com/package/celebrate"
// }

// {
//   "email": "harry@potter.com",
//   "password": "123"
// }
