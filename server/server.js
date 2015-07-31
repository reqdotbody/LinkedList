//Import npm modules
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var session = require('express-session');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

var morgan = require('morgan'); 
var flash = require('connect-flash');
var path = require('path');

//Initialize the instance of express
var app = express();


//Import our app routes and auth config
var routes = require('./routes.js');
var passportConfig = require('./config/passport.js')(passport);
var STATICFILES = path.join(process.env.PWD, '../bower_components');

//Setup our database
var knexfile = require('./knexfile.js');
var environment = 'development'
var knex = require('knex')(knexfile[environment]);
knex.migrate.latest([knexfile]);

//Configure express
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(cookieParser());

app.use(session({
  secret: 'sour patch kids',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}));

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(flash()); 
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('client'))
app.use('/scripts', express.static(STATICFILES));


// Writes all the routes to the server instance in the routes.js file
routes(app);


// Initiate the server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);


});
