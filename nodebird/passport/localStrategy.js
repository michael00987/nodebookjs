const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const {User} = require('../models');
module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // req.body.email  클라이언트가 보낼때 email 로 보내야 한다. 만약 id로 보낸다면 이곳도 id 가 되어야 한다.
        passwordField: 'password', // req.body.password  클라이언트가 보낼때 password 로 보내야 한다. 만약 pwd로 보낸다면 이곳도 pwd 가 되어야 한다.
      },
      async (email, password, done) => {
        //done(에러, 성공, 실패)
        try {
          const exUser = await User.findOne({where: {email}});
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser); // 성공했기 때문에 실패 메세지는 보내지 않아도 된다.
            } else {
              done(null, false, {message: '비밀번호가 일치하지 않습니다.'}); // 에러는 없기때문에 null, 성공하지 않았기 때문에 false, 실패했기 때문에 실패 메세지
            }
          } else {
            done(null, false, {message: '가입되지 않은 사용자입니다.'});
          }
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
};
