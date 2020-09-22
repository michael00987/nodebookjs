const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('정상 라우터');
});

router.get('/posts', (req, res) => {
  res.send('Hello posts');
});
router.get('/comments', (req, res) => {
  res.send('Hello comments');
});
router.get('/list', (req, res) => {
  res.send('Hello list');
});
router.post('/', (req, res) => {
  res.send('Hello post');
});

module.exports = router;
