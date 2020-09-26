const express = require('express');
const multer = require('multer');
const path = require('path');
const {Post, Hashtag, User} = require('../models');
const {isLoggedIn} = require('./middlewares');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
    },
  }),
  limits: {fileSize: 5 * 1024 * 1024},
});

// single('img') 안에 있는 img 는 form 으로 보내는 id or name 과 같아야 한다.
/**
 * single : 이미지 하나( 필드명)
 * array: 이미지 여러 개( 단일 필드)
 * field: 이미지 여러 개 (여러 필드 )
 * none: 이미지 X
 */
// /img 경로로 진입하면 업로드 미들웨어가 실행되고, 콜백이 실행된다.
router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  // 이곳은 이미지를 업로드 한 후에 실행 된다
  // 보통 req.body 에 저장되는데, 이미지(파일) 업로드 한것은 req.file에 저장된다.
  console.log(req.file);
  res.json({url: `/img/${req.file.filename}`});
});

const upload2 = multer(); // 케이스 별로 나눠서 멀터와 api를 설정해야하는거 같다.
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  // 이미지 없이 글만 올릴때
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      userId: req.user.id,
    });
    const hashtags = req.body.content.match(/#[^\s]*/g);
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map((tag) =>
          Hashtag.findOrCreate({
            where: {title: tag.slice(1).toLowerCase()},
          })
        )
      );
      await post.addHashtags(result.map((r) => r[0]));
    }
    res.redirect('/');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({where: {title: query}});
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({include: [{model: User}]});
    }
    return res.render('main', {
      title: `${query} | nodebird`,
      user: req.user,
      twits: posts,
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
