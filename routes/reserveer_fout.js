var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', function(req, res, next) {
  res.render('reserveer_fout', { title: 'Navok eetfestijn' });
});

module.exports = router;
