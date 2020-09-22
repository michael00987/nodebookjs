var express = require('express');
var router = express.Router();
const { User } = require('../models');
/* GET home page. */
router.get('/', function (req, res, next) {
  User.findAll()
    .then((users) => {
      res.render('sequelize', { title: '시퀄라이즈 연습', users });
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
