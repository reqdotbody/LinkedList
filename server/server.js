var express = require('express');
var app = express();
var port = 3000;


//SERVER HELPERS
var morgan = require('morgan'); 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

//USER AUTH
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');

//DATABASE
var knexfile = require('./knexfile.js');
var environment = 'development'
var knex = require('knex')(knexfile[environment]);

knex.migrate.latest([knexfile]);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(session({secret: 'anystringoftext',
         saveUninitialized: true,
         resave: true}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Serve up the LinkedList page

app.use(express.static('client'))

//If the request contains 
app.post('/jobs', function(req,res){
  db.fetchJobs(req,res, function(results){
    res.end(JSON.stringify(results));
  })
})
app.post('/jobs/create', function (req, res) {
  db.addJob(req.body, function(results){
    res.end(JSON.stringify(results));
    db.addUserJob(req.body.owner, req.body.title, req.body.status);
  });
});

require('./app/routes.js')(app, passport);

app.listen(port);
console.log('Server running on port: ' + port);



