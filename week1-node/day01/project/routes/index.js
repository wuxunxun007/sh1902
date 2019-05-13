var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: '<mark>Express</mark>',
    list: [ 'a', 'b', 'c', 'd'],
    flag: true
  });
});

module.exports = router;
