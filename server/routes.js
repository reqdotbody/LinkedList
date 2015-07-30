var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var dashboardHandler = require('./requestHandlers/dashboardHandler.js');
var mainHandler = require('./requestHandlers/mainHandler.js');
var projectHandler = require('./requestHandlers/projectHandler.js');

module.exports = function(app){

  // This routes module is exporting a function that will decorate the app (express server instance)
  // with routes.
  console.log("routes.js");

  //////////////////////////////////////
  //                                  // 
  //   GITHUB AUTHENTICATION ROUTES   //  
  //                                  //
  //////////////////////////////////////

  app.get('/auth/github', 
    passport.authenticate('github', { display: 'popup' }, function(req, res){
  }));
  
  
  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
      //TODO - redirect new user to their projects (in failureRedirect & in here)
        //if they don't have projects, send them to the view projects page
        //if they do have a project, send them to their projects page

      res.redirect('/');
   });

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

  //Template
  //app.post('< URL endpoint > ', <relevant handler. relevant method>);

  //Examples

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