var express = require('express');
var router = express.Router();
const User = require('../schemas/user');
/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});
router.post('/', function (req, res, next) {
  const { name, age, married } = req.body;
  const user = new User({
    name,
    age,
    married,
  });
  user
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
