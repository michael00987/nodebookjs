const express = require('express');
const {Post, User} = require('../models');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('profile', {title: '내정보-nodebird', user: req.user});
});
router.get('/join', isNotLoggedIn, (req, res, next) => {
  res.render('join', {
    title: '회원가입-nodebird',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});
router.get('/', (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ['id', 'nick'],
      },
      {
        model: User,
        attributes: ['id', 'nick'],
        as: 'Liker',
      },
    ],
  })
    .then((posts) => {
      res.render('main', {
        title: 'nodebird',
        twits: posts,
        user: req.user,
        loginError: req.flash('loginError'),
      });
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
