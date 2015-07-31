var GithubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var User = require('../models/userModel.js');


module.exports = function(passport) {

	//if in heroku environment, use their variables, if not, use our own from auth.js file.
	var auth = process.env.DATABASE_URL ? null : require('./auth.js');
	var callbackURL ="http://localhost:3000/auth/github/callback"
	
	// used to serialize the user for the session
	// this happens when a user first visits the site and logs in via github
	passport.serializeUser(function(user, done){
		console.log("serializing");
		console.log('user in serialize user: ', user);

		done(null, user);

	});

	// used to deserialize the user
	// this happens on every request so we know which user is logged in.
	passport.deserializeUser(function(user, done){
		console.log("deserializing");
		console.log('deserialize user:', user);
		
		User.findUserByGithubId(user.github_id, function(err, user) {
		  // if user is found within sessions, they can proceed with request
		  // if not, returns error
		  return user ? done(null, user) : done(err, null);
		 });

	});

	// =========================================================================
	// GITHUB  ================================================================
	// =========================================================================
	passport.use(new GithubStrategy({

	  // pull in our app id and secret from either heroku or our auth.js file.
	  clientID        : auth.githubAuth.clientID,
	  clientSecret    : auth.githubAuth.clientSecret,
	  callbackURL     : auth.githubAuth.callbackURL,
	  passReqToCallback: true
	},

	// github will send back the token and profile
	function(req, accessToken, refreshToken, profile, done) {

		 req.session.token = accessToken;
		 req.session.passport = 
		 req.session.cookie.expires = new Date(Date.now() + 8*60*60*1000);


		 console.log('req.session:', req.session);
		 console.log('req.session.token:', req.session.token);
		 console.log('req.session.cookie:', req.session.cookie);
		 console.log('req.isAuthenticated:', req.isAuthenticated());

		 var newUser = {};

		 newUser.github_id          =   profile.id;               //integer
		 newUser.github_username    =   profile.username;         //string 
		 newUser.github_displayName =   profile.displayName;      //string
		 newUser.github_img         =   profile._json.avatar_url; //string
		 newUser.gihub_email        =   profile.emails[0].value;  //string
		 newUser.github_location 	  =   profile._json.location;   //string
		 newUser.github_url         =   profile._json.html_url;   //string
		
		 process.nextTick(function () {
		 		console.log('profile:', profile);

		    User.findUserByGithubId(profile.id, function(err, user) {
		       if (err) { return done(err); }
		       if (user === null) {
		           User.addGithubUser(newUser, function(err, results){
	       	   			if(err) throw err;
	       	   			console.log("successful add to db", results);
	       	   		});
	       	   		return done(null, newUser);
		       } else { //add this else
		           return done(null, user, {redirectTo:'/'});
		       }
			  });
		 });

	   

	}));
};



