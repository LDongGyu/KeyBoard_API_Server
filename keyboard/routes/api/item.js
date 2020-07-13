var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('item');
});

router.get('/create', function(req, res, next) {
  res.send('item create');
});

router.get('/read', function(req, res, next) {
  res.send('item read');
});

router.get('/update', function(req, res, next) {
  res.send('item update');
});

router.get('/delete', function(req, res, next) {
  res.send('item delete');
});
module.exports = router;
