const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/:roomId', function(req, res, next) {
  res.render('room', {
    title: 'Pub/Sub Sample',
    roomId: req.params.roomId
  });
});

module.exports = router;
