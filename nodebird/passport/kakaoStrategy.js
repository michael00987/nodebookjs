const KakaoStrategy = require('passport-kakao').Strategy;
const {User} = require('../models');
module.exports = (passport) => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: 'http://localhost:8001/auth/kakao/callback',
      },
      async (accessToken, refreshToekn, profile, done) => {
        console.log(profile);
        try {
          const exUser = await User.findOne({
            where: {snsId: profile.id, provider: 'kakao'},
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account.email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: 'kakao',
            });
            done(null, newUser);
          }
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
};
