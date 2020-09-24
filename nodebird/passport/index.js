const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} = require('../models');

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    // 처음 접속할때만 실행된다.
    // user{id:1,nick:michael,email:michael@gmail.com, ...} ==> id:1
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    // 접속후에 요청 할 때마다 실행된다.
    // id:1 ==> user{id:1,nick:michael,email:michael@gmail.com, ...}
    User.findOne({where: {id}})
      .then((user) => done(null, user))
      .catch((e) => done(e));
  });
  local(passport);
  kakao(passport);
};
