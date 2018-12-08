var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    username : {type: String, required: true, max: 100, min: 3},
	password : {type: String, required: true, max: 100, min: 3}
  }
);

UserSchema
.virtual('verifyPassword') // wordt gebruikt in de weergave van het pug bestand author_list.pug
.get(function () {
  return this.password;
});

//Export model
module.exports = mongoose.model('User', UserSchema);