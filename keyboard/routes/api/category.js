var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('category');
});

router.get('/create', function(req, res, next) {
  res.send('category create');
});

router.get('/read', function(req, res, next) {
  res.send('category read');
});

router.get('/update', function(req, res, next) {
  res.send('category update');
});

router.get('/delete', function(req, res, next) {
  res.send('category delete');
});

module.exports = router;
