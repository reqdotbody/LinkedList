var express = require('express');
var router = express.Router();
var session = require('express-session');
var env = process.env.NODE_ENV || 'development';
var GitHubStrategy = require('passport-github').Strategy;
var router = express.Router();
var passport = require('passport');
// var dashboardHandler = require('./requestHandlers/dashboardHandler.js');
// var mainHandler = require('./requestHandlers/mainHandler.js');
// var projectHandler = require('./requestHandlers/projectHandler.js');

module.exports = function(router){
  // This routes module is exporting a function that will decorate the app (express server instance)
  // with routes.
  console.log("routes.js is on-board!");

  //////////////////////////////////////
  //                                  // 
  //   GITHUB AUTHENTICATION ROUTES   //  
  //                                  //
  //////////////////////////////////////

  router.get('/github', 
    passport.authenticate('github', { display: 'popup' }, function(req, res){
  }));
  
  router.get('/github/callback',
    passport.authenticate('github', { 
      failureRedirect: '/login', 
      failureFlash: true
    }),function(req,res){
      res.redirect('/');
    });

  router.get('/isLoggedIn', function(req, res, next){
    console.log('in server isLoggedIn endpoint');
    console.log(req.isAuthenticated());
   // res.json(req.isAuthenticated());
    res.json(req.isAuthenticated());
  })

  router.get('/logout', function(req, res, next){
    console.log('in auth/logout server endpoint')
    req.logout();
    res.end();
   // res.redirect('/');
  });
  
}


// route middleware to make sure a user is logged in
  // not currently being used
// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated())
//     return next();

//   res.redirect('/');
// }




  //////////////////////////////////////
  //                                  // 
  //   ALL OTHER ROUTES               //  
  //                                  //
  //////////////////////////////////////

  //TODO -- once we have the routes working off of api.js, refactor the following pattern.
  
  // BASIC ROUTING ----------------------------------
  //POST Requests

  //Template
  //app.post('< URL endpoint > ', <relevant handler. relevant method>);

  //Examples
  // app.post('/dwellings', dwellingHandler.add);
  // app.post('/inviteRoomie', dwellingHandler.inviteRoomie);
  // app.post('/joinDwelling', userHandler.joinDwelling);
  // app.post('/tasks', taskHandler.add);
  // app.post('/taskInstances', taskHandler.updateInstance);
  // app.post('/delegateTasks', taskHandler.delegateTasks)
  
  // GET REQUESTS

  // Template
  // app.post('< URL endpoint > ', <relevant handler. relevant method>);

  // Examples

  // app.get('/tasks', taskHandler.getAll);
  // app.get('/taskInstances', taskHandler.getAllInstances);
  // app.get('/myInstances', taskHandler.getUserInstances);
  // app.get('/users', userHandler.getRoomies);
  // app.get('/dwellings', dwellingHandler.getUsersDwelling);

  //return app;