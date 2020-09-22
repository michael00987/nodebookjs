const express = require('express');
const router = express.Router();
const { User } = require('../models');
/* GET users listing. */
router.get('/', function (req, res, next) {
  User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  const { name, age, married } = req.body;
  User.create({
    name,
    age,
    married,
  })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});
module.exports = router;
