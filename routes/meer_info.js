var express = require('express');
var router = express.Router();

/* GET meer info page. */
router.get('/', function(req, res, next) {
  res.render('meer_info', { title: 'Navok eetfestijn' });
});

module.exports = router;
