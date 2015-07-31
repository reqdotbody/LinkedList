//Import npm modules
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

var logger = require('morgan'); 
var flash = require('connect-flash');
var path = require('path');

//Initialize the instance of express
var app = express();


//Import our app routes and auth config
var routes = require('./routes.js');
var STATICFILES = path.join(process.env.PWD, '../bower_components');
var passportConfig = require('./config/passport.js')(passport);

//Setup our database
var knexfile = require('./knexfile.js');
var environment = process.env.NODE_ENV || 'development';
var knex = require('knex')(knexfile[environment]);
knex.migrate.latest([knexfile]);

/* TO DO: uncomment after placing your favicon in /public */
// app.use(favicon(path.join(process.env.PWD, 'public', 'favicon.ico')));

app.use(express.static('client'))
app.use('/scripts', express.static(STATICFILES));

//Configure express
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(session({
  secret: 'sour patch kids',
  resave: true,
  saveUninitialized: true,
}));
app.use(flash()); 


app.use(passport.initialize());
app.use(passport.session());


// Writes all the routes to the server instance in the routes.js file
routes(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log("entered 500 error handler");
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
    return;
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
  return;
});



// Initiate the server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('The magic happens at http://%s:%s', host, port);

});
