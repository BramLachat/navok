var express = require('express');
var router = express.Router();

/* GET over_ons page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Navok eetfestijn' });
});

module.exports = router;