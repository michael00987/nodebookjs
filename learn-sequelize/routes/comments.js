const express = require('express');
const router = express.Router();
const { User, Comment } = require('../models');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Comment.findAll({
    include: {
      model: User,
      where: { id: req.params.id },
    },
  })
    .then((comments) => {
      console.log(comments);
      res.json(comments);
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});
router.patch('/:id', (req, res, next) => {
  const { id } = req.params;
  const { comment } = req.body;
  Comment.update(
    { comment },
    {
      where: {
        id,
      },
    }
  ).then((result) => {
    res.json(result);
  });
});
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Comment.destroy({
    where: {
      id,
    },
  }).then((result) => {
    res.json(result);
  });
});
router.post('/', (req, res, next) => {
  const { id, comment } = req.body;
  Comment.create({
    commenter: id,
    comment,
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
