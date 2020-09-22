const express = require('express');
const router = express.Router();

/* GET  /users/ */
router.get('/', (req, res) => {
  res.send('Hello users');
});
/* DELETE /users/ */
router.delete('/', (req, res) => {
  res.send('Hello delete');
});
module.exports = router;
