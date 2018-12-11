var express = require('express');
var router = express.Router();
var async = require('async');
var Persoon = require('../models/persoon_model');
var Inschrijving = require('../models/reserveringen_model');

router.get('/', function(req, res, next) {

    async.parallel({
        persoon_count: function(callback) {
            Persoon.countDocuments({}).exec(callback);
        },
		volwassen_kalkoenfilet_count: function(callback){
			Inschrijving.aggregate([{$group: {_id: 0, aantal: { $sum: '$volwassenen_kalkoenfilet'}}}]).exec(callback);
		},
		volwassen_beenhesp_count: function(callback){
			Inschrijving.aggregate([{$group: {_id: 0, aantal: { $sum: '$volwassenen_beenhesp'}}}]).exec(callback);
		},
		volwassen_kaaskroket_count: function(callback){
			Inschrijving.aggregate([{$group: {_id: 0, aantal: { $sum: '$volwassenen_kaaskroket'}}}]).exec(callback);
		},
		kind_kalkoenfilet_count: function(callback){
			Inschrijving.aggregate([{$group: {_id: 0, aantal: { $sum: '$kinderen_kalkoenfilet'}}}]).exec(callback);
		},
		kind_beenhesp_count: function(callback){
			Inschrijving.aggregate([{$group: {_id: 0, aantal: { $sum: '$kinderen_beenhesp'}}}]).exec(callback);
		},
		kind_kaaskroket_count: function(callback){
			Inschrijving.aggregate([{$group: {_id: 0, aantal: { $sum: '$kinderen_kaaskroket'}}}]).exec(callback);
		},
		persoon_email: function(callback) {
			Persoon.find().exec(callback);
		},
	}, function(err, results) {
        res.render('gegevensdatabase', { title: 'Inschrijvingen', error: err, data: results });
    });

});

router.post('/', function(req, res, next) {
	async.parallel({
        persoon: function(callback) {
          Persoon.find().where('email').equals(req.body.email).exec(callback)
        },
    }, function(err, results) {
		if (err) { return next(err); }
		if (results.persoon.length < 1) {
            res.render('verwijderd', { title: 'Helaas! Deze persoon werd niet gevonden!'} );
            return;
        }
		else{
			Persoon.remove({email: req.body.email}, function deleteAuthor(err) {
                if (err) { return next(err); }
			})
			Inschrijving.remove({persoon: results.persoon}, function deleteAuthor(err) {
				if (err) { return next(err); }
				res.render('verwijderd', { title: 'Deze persoon en zijn reservering werden met succes verwijderd!'} );
			})
		}
	});
});

// router.get('/', function(req, res, next) {
	
// };


/* GET reservering_geslaagd page. */
// router.get('/', function(req, res, next) {
	
	// Persoon.find()
    // .sort([['achternaam', 'ascending']])
    // .exec(function (err, list_personen) {
      // if (err) { return next(err); }
      // Successful, so render
      // res.render('gegevensdatabase', { title: 'Inschrijvingen', personen_list: list_personen });
    // });
	
  // res.render('gegevensdatabase', { title: 'Navok eetfestijn' });
// });

module.exports = router;
