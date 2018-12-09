var express = require('express');
var router = express.Router();

/* GET menu page. */
router.get('/', function(req, res, next) {
  res.render('menu', { title: 'Navok eetfestijn' });
});

/*GET drankenlijst*/
/*router.get('prijzenlijst.txt',function (req,res,next){
  res.sendFile('/public/prijzenlijst.txt');
  
});*/

module.exports = router;