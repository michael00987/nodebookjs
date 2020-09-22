var express = require('express');
var router = express.Router();
const User = require('../schemas/user');
/* GET home page. */
router.get('/', (req, res, next) => {
  User.find()
    .then((users) => {
      res.render('mongoose', { title: '몽구스 연습', users: users });
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});
router.post('/', (req, res, next) => {});

module.exports = router;
