var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var menuRouter = require('./routes/menu'); //gewijzigd
var reserveerRouter = require('./routes/reserveer'); // gewijzigd
var meerInfoRouter = require('./routes/meer_info'); // gewijzigd
var overOnsRouter = require('./routes/over_ons'); // gewijzigd
var geslaagdRouter = require('./routes/reservering_geslaagd'); // gewijzigd
var logInRouter = require('./routes/login');
var reserveerFoutRouter = require('./routes/reserveer_fout');
var fouteLoginRouter = require('./routes/login_fout');
var gegevensdatabaseRouter = require('./routes/gegevensdatabase');
var verwijderdRouter = require('./routes/verwijderd');
var compression = require('compression');
var helmet = require('helmet');


var usersRouter =require('./routes/users');
var passport = require('passport');

var app = express();
app.use(compression()); //Compress all routes
app.use(helmet());

/*GET drankenlijst*/
var fs = require('fs');
//var tekst="";

app.get('/prijzenlijst', function(req,res){
  fs.readFile('./public/prijzenlijst','utf8',function(error,data){
    console.log(data);
  });
  res.send(data);
});

//Set up mongoose connection
var mongoose = require('mongoose');
//var mongoDB = 'mongodb://bram_lachat:bl200298@ds247223.mlab.com:47223/local_library2';
var mongoDB = process.env.MONGODB_URI || 'mongodb://navokeetfestijn:Navok_Eetfestijn_2018@ds249372.mlab.com:49372/navok_eetfestijn';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//voor login (WERKT VOLLEDIG)
var Account= require('./models/account');
//var passport=require('passport');


//hashen
var passwordHash = require('password-hash');

app.get('/registreren', function(req, res) {
  res.render('registreren', { });
});

//kijken of de username al bestaat, anders registreren
app.post('/registreren', function(req,res){
  var name = req.body.username;
  var pass = req.body.password;
  var password=passwordHash.generate(pass) //password hashen

  Account.findOne({username :name},function(err,naam){
    if(err){
      console.log(err);
      return res.status(500).send;
    }
    if(naam){
      console.log('username bestaat al');
      res.redirect('/registreren');
    }
    if(!naam){
      var account = new Account({
        username: name,
        password: password
      })

      account.save(function (err) {
        if (err) { console.log(err); }
        res.redirect('/');
      });
    }
  })
});
app.get('/login',function(req,res){
  res.render('login');
})

//als de login correct is krijg je toegang tot de gegevens van de database
app.post('/login', function(req,res){
  var username=req.body.username;
  var password=req.body.password;

  Account.findOne({username: username}, function(err,acc){
    //var hashedpassword = username; //nog niet klaar
    console.log(acc);
    if(err){
      console.log(err);
      return res.status(500).send;
    }
    if(!acc){ //als username niet bestaat
      res.render('login_fout');
      console.log('foute username of password');
    }
    if(acc){
      if(passwordHash.verify(password,acc.password)){
        res.redirect('/gegevensdatabase'); //HIER MOET DE PAGINA KOMEN DIE DE GEGEVENS UIT DE DATABASE TOONT
      }
      else{ //als het paswoord fout is
        res.render('login_fout');
        console.log('foute username of password');
      }
    }
  });
});

app.use('/', indexRouter);
app.use('/menu', menuRouter); // gewijzigd
app.use('/reserveer', reserveerRouter); //gewijzigd
app.use('/meer_info', meerInfoRouter); //gewijzigd
app.use('/over_ons', overOnsRouter); //gewijzigd
app.use('/reservering_geslaagd', geslaagdRouter); //gewijzigd
app.use('/login', logInRouter); //gewijzigd
app.use('/login_fout', fouteLoginRouter); //gewijzigd
app.use('/gegevensdatabase',gegevensdatabaseRouter); //gewijzigd
app.use('/reserveer_fout', reserveerFoutRouter); //gewijzigd
app.use('/verwijderd', verwijderdRouter); //gewijzigd


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
