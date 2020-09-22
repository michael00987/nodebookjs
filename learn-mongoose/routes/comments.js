const express = require('express');
const router = express.Router();
const Comment = require('../schemas/comment');

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Comment.find({ commenter: id })
    .populate('commenter')
    .then((comments) => {
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
  Comment.update({ _id: id }, { comment })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});
router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  Comment.remove({ _id: id })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});
router.post('/', (req, res, next) => {
  const { id, comment } = req.body;
  const post = new Comment({
    commenter: id,
    comment,
  });
  post
    .save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((e) => {
      console.error(e);
      next(e);
    });
});

module.exports = router;
