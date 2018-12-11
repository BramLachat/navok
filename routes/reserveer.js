var express = require('express');
var router = express.Router();

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var Reservering = require('../models/reserveringen_model'); //Inschrijving
var Persoon = require('../models/persoon_model');

/* //GET reserveer page. 
router.get('/', function(req, res, next) {
  res.render('reserveer', { title: 'Navok eetfestijn' });
}); */

router.get('/', function(req, res, next) {
  res.render('reserveer', { title: 'Navok eetfestijn' });
});

// Handle Genre create on POST.
router.post('/', [
   
    // Validate that the name field is not empty.
    body('voornaam', 'Gelieve uw voornaam in te vullen!').isLength({ min: 1 }).trim().isAlpha(['nl-NL']).isAscii().withMessage('Voornaam bevat niet toegelaten karakters!'),
	body('achternaam', 'Gelieve uw achternaam in te vullen!').isLength({ min: 1 }).trim().isAlpha(['nl-NL']).isAscii().withMessage('Achternaam bevat niet toegelaten karakters!'),
	body('email').isLength({ min: 1 }).trim().withMessage('Gelieve uw emailadres in te vullen!').isEmail().withMessage('Dit is geen correct emailadres!'),
    body('volwassen_kalkoen').trim().isInt({min:0}).withMessage('Het aantal dat u heeft ingegeven is niet geldig!'),
	body('volwassen_beenhesp').trim().isInt({min:0}).withMessage('Het aantal dat u heeft ingegeven is niet geldig!'),
	body('volwassen_kaas').trim().isInt({min:0}).withMessage('Het aantal dat u heeft ingegeven is niet geldig!'),
	body('kind_kalkoen').trim().isInt({min:0}).withMessage('Het aantal dat u heeft ingegeven is niet geldig!'),
	body('kind_beenhesp').trim().isInt({min:0}).withMessage('Het aantal dat u heeft ingegeven is niet geldig!'),
	body('kind_kaas').trim().isInt({min:0}).withMessage('Het aantal dat u heeft ingegeven is niet geldig!'),
	
    // Sanitize (trim and escape) the name field.
    sanitizeBody('voornaam').trim().escape(),
	sanitizeBody('achternaam').trim().escape(),
	sanitizeBody('email').trim(),
	sanitizeBody('volwassen_kalkoen').trim(),
	sanitizeBody('volwassen_beenhesp').trim(),
	sanitizeBody('volwassen_kaas').trim(),
	sanitizeBody('kind_kalkoen').trim(),
	sanitizeBody('kind_beenhesp').trim(),
	sanitizeBody('kind_kaas').trim(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('reserveer', { title: 'Navok eetfestijn', reservering: req.body, errors: errors.array()}); 
        return;
        }
        else {
            // Data from form is valid.
			var persoon = new Persoon(
                {
                    voornaam: req.body.voornaam,
					achternaam: req.body.achternaam,
					email: req.body.email,
                });
			var reservering = new Reservering(
                {
					persoon: persoon._id,
					volwassenen_kalkoenfilet: req.body.volwassen_kalkoen,
					volwassenen_beenhesp: req.body.volwassen_beenhesp,
					volwassenen_kaaskroket: req.body.volwassen_kaas,
					kinderen_kalkoenfilet: req.body.kind_kalkoen,
					kinderen_beenhesp: req.body.kind_beenhesp,
					kinderen_kaaskroket: req.body.kind_kaas
                });
            // Check if Genre with same name already exists.
            Persoon.findOne({ 'email': req.body.email })
					.exec( function(err, found_email) {
					if (err) { return next(err); }

                    if (found_email) {
                         // Genre exists, redirect to its detail page.
                        res.redirect(found_email.gevonden);
					}
                    else {
						persoon.save(function (err) {
							if (err) { return next(err); }
						});
                        reservering.save(function (err) {
							if (err) { return next(err); }
							res.redirect('reservering_geslaagd');
                           // Genre saved. Redirect to genre detail page.
                         });
                           // Genre saved. Redirect to genre detail page.


                    }

                 });
        }
    }
]);

// DIT WERKT GELIEVE NIET TE VERWIJDEREN!!!
/* router.get('/', function(req, res, next) {

  Inschrijving.find()
    //.sort([['family_name', 'ascending']])
    .exec(function (err, list_authors) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('author_list', { title: 'Inschrijvingen', author_list: list_authors });
    });

}); */

module.exports = router;
