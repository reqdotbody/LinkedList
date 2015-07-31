var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var dashboardHandler = require('./requestHandlers/dashboardHandler.js');
var mainHandler = require('./requestHandlers/mainHandler.js');
var projectHandler = require('./requestHandlers/projectHandler.js');

module.exports = function(app){

  // This routes module is exporting a function that will decorate the app (express server instance)
  // with routes.
  console.log("routes.js is on-board!");

  //////////////////////////////////////
  //                                  // 
  //   GITHUB AUTHENTICATION ROUTES   //  
  //                                  //
  //////////////////////////////////////

  app.get('/auth/github', 
    passport.authenticate('github', { display: 'popup' }, function(req, res){
  }));
  
  
  app.get('/auth/github/callback',
    passport.authenticate('github', { successRedirect: '/', failureRedirect: '/login' }));

  app.get('/auth/isLoggedIn', function(req, res){
    console.log('in server isLoggedIn endpoint');
    console.log(req.isAuthenticated());

    res.status(200).json(req.isAuthenticated());
  })

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

  return app;
}


// route middleware to make sure a user is logged in
  // not currently being used
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();

  res.redirect('/#/signin');
}