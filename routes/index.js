var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('front/index', { title: 'Express' });
});
router.get('/information', function(req, res, next) {
    res.render('front/information', { title: 'Express' });
});
router.get('/ticket', function(req, res, next) {
    res.render('front/ticket', { title: 'Express' });
});
router.get('/scenery', function(req, res, next) {
    res.render('front/information', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
    res.render('front/about', { title: 'Express' });
});

module.exports = router;
