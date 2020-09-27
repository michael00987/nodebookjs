const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {User} = require('../models');

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const {email, nick, password} = req.body;
  try {
    const exUser = await User.findOne({where: {email}});
    if (exUser) {
      req.flash('joinError', '이미 가입된 이메일 입니다.');
      return res.redirect('/join');
    } else {
      console.time('암호화시간');
      const hash = await bcrypt.hash(password, 12);
      console.timeEnd('암호화시간');
      await User.create({
        email,
        nick,
        password: hash,
      });
      return res.redirect('/');
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  //req.body.email, req.body.password
  passport.authenticate('local', (authError, user, info) => {
    // 로컬전략을 지나서 유저 정보를 받아온다.
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return res.redirect('/');
    }
    return req.login(user, (loginError) => {
      // 받아온 유저정보를 세션에 저장하면서 serializeUser 가 실행된다.
      // req.user
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  // req.session.destroy();   req.logout 을 하면 다른 세션도 지워지기 때문에 안해도 되는데, 영상에서 req에서 유저를 삭제해주는지 확신이 없기 땨문에 세션을 날린다.
  res.redirect('/');
});

router.get('/kakao', passport.authenticate('kakao')); // kakao전략이 실행됨
router.get('/kakao/callback', passport.authenticate('kakao', {failureReDirect: '/'}), (req, res) => {
  res.redirect('/');
});

module.exports = router;
