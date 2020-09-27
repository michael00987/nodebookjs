const express = require('express');

const {User, Domain} = require('../models');
const router = express.Router();

router.get('/', (req, res, next) => {
  User.fineOne({
    where: {
      id: req.user && req.user.id,
    },
    include: {model: Domain},
  })
    .then((user) => {
      res.render('login', {
        user,
        loginError: req.flash('loginError'),
        domains: user && user.domains,
      });
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});
module.exports = router;
