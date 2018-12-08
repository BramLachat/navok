var express = require('express');
var router = express.Router();

/* GET login_fout page. */
router.get('/', function(req, res, next) {
  res.render('login_fout', { title: 'Navok eetfestijn' });
});

module.exports = router;