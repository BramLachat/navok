//require mongoose
var mongoose = require('mongoose');

//schema definieren
var Schema = mongoose.Schema;

var schema = new Schema({
    voornaam: {type: String, required: true},
    achternaam: {type: String, required: true},
    email: {type: String, required: true}
});

// schema
// .virtual('name') // wordt gebruikt in de weergave van het pug bestand author_list.pug
// .get(function () {
  // return this.volledigeNaam.voornaam + ' ' + this.volledigeNaam.achternaam;
// });

schema
.virtual('gevonden')
.get(function () {
  return '/reserveer_fout/';
});

schema
.virtual('naam')
.get(function () {
  return this.voornaam + ' ' + this.achternaam;
});

module.exports = mongoose.model('Persoon', schema);

//model creeeren
//var model = mongoose.model('model', schema);

//record aanmaken van model // create an instance of model
/* var inschrijving = new model({
    volledigeNaam:{
        voornaam: 'inlezen',
        achternaam: 'inlezen'
    },
    email: 'inlezen',
    volwassenen_kalkoenfilet:0, //ook nog allemaal inlezen
    volwassenen_beenhesp:0,
    volwassenen_kaaskroket:0,
    kinderen_kalkoenfilet:0,
    kinderen_beenhesp:0,
    kinderen_kaaskroket:0
});

//model saven
inschrijving.save(function(err){
    if(err) return handleError(err);
    //anders wordt het gesaved
}); */

//zie tutorial searching for records om records te kunnen lezen (denk ik)
