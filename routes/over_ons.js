var express = require('express');
var router = express.Router();

/* GET over ons page. */
router.get('/', function(req, res, next) {
  res.render('over_ons', { title: 'Navok eetfestijn' });
});

module.exports = router;
