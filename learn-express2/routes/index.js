const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'ejs', fruits: ['사과', '배', '감', '바나나'] });
});

module.exports = router;
