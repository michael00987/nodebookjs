const express = require('express');
const {User} = require('../models');
const router = express.Router();
const {isLoggedIn} = require('./middlewares');

router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({where: {id: req.user.id}}); // 현재 로그인한 나 자신을 찾아서
    await user.addFollowing(parseInt(req.params.id, 10)); // 나에게 나를 팔로윙한사람츨 찾아서 넣는다.
    res.send('success');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
