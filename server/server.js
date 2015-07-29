//Import npm modules
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan'); 
var flash = require('connect-flash');
var path = require('path');

//Import our app routes and auth config
var routes = require('./routes.js');
var passportConfig = require('./config/passport.js')(passport);

//Setup our database
var knexfile = require('./knexfile.js');
var environment = 'development'
var knex = require('knex')(knexfile[environment]);
knex.migrate.latest([knexfile]);

//Initialize the instance of express
var app = express();

//Configure express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(session({secret: 'anystringoftext',
         saveUninitialized: true,
         resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 
app.use(express.static('client'))

// Writes all the routes to the server instance in the routes.js file
routes(app);


// Initiate the server
var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);


});
