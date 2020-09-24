const express = require('express');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.render('profile', {title: '내정보-nodebird', user: null});
});
router.get('/join', isNotLoggedIn, (req, res, next) => {
  res.render('join', {
    title: '회원가입-nodebird',
    user: req.user,
    joinError: req.flash('joinError'),
  });
});
router.get('/', (req, res, next) => {
  res.render('main', {
    title: 'nodebird',
    twits: [],
    user: req.user,
    loginError: req.flash('loginError'),
  });
});

module.exports = router;
