//require mongoose
var mongoose = require('mongoose');

//schema definieren
var Schema = mongoose.Schema;

var schema = new Schema({
    persoon: {type: Schema.Types.ObjectId, ref: 'Persoon' },
    volwassenen_kalkoenfilet: {type: Number, default: 0},
    volwassenen_beenhesp: {type: Number, default: 0},
    volwassenen_kaaskroket: {type: Number, default: 0},
    kinderen_kalkoenfilet: {type: Number, default: 0},
    kinderen_beenhesp: {type: Number, default: 0},
    kinderen_kaaskroket: {type: Number, default: 0}
});

schema
.virtual('name') // wordt gebruikt in de weergave van het pug bestand author_list.pug
.get(function () {
  return this.volledigeNaam.voornaam + ' ' + this.volledigeNaam.achternaam;
});

module.exports = mongoose.model('Reservering', schema);

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
