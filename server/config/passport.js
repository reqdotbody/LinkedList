var GithubStrategy = require('passport-github2').Strategy;
var User = require('../models/userModel.js');


module.exports = function(passport) {

	//if in heroku environment, user their variables, if not, use our own from auth.js file.
	var auth = process.env.DATABASE_URL ? null : require('./auth.js');
	var callbackURL = process.env.DATABASE_URL ? "http://linkedlist-staging.herokuapp.com/auth/github/callback" : auth.githubAuth.callbackURL;
	
	console.log("IN HERE PASSPORT.JS")
	// used to serialize the user for the session
	// this happens when a user first visits the site and logs in via github
	passport.serializeUser(function(user, done){
		console.log(user);
		console.log("in here too");
		done(null, user.github_id);

	});

	// used to deserialize the user
	// this happens on every request so we know which user is logged in.
	passport.deserializeUser(function(id, done){

		//TODO - change this method in the model to findUserByGitHubID
		User.findUserByFacebookId(facebook_id, function(err, user) {

		  // if user is found within sessions, they can proceed with request
		  // if not, returns error
		  user ? done(null, user) : done(err, null);
		});

	});


		// =========================================================================
		// GITHUB  ================================================================
		// =========================================================================
		passport.use(new GithubStrategy({

		  // pull in our app id and secret from either heroku or our auth.js file.
		  clientID        : process.env.GITHUB_CLIENT_ID || auth.githubAuth.clientID,
		  clientSecret    : process.env.GITHUB_CLIENT_SECRET || auth.githubAuth.clientSecret
		  // callbackURL     : 'http://localhost:3000/auth/github/callback'
		},

		// github will send back the token and profile
		function(accessToken, refreshToken, profile, done) {
		   // asynchronous verification, for effect...
		   process.nextTick(function () {
		  	console.log("We got a token back..."); 
		  	console.log(accessToken);
		  	console.log(profile);
		  	

		    var github_id = profile.id;

		    // find the user in the database based on their github id
		    //TODO -- change to github method
		    User.findUserByFacebookId(github_id, function(err, user) {

		      // if there is an error, stop everything and return that
		      // i.e. an error connecting to the database
		      if (err) return done(err);

		        // if the user is found, then log them in
		        if (user) {
		          return done(null, user);
		        } else {

		        	console.log(profile);
		          // if there is no user found with that facebook id, create them
		          var newUser = {};

		          // take information returned from facebook and using that data,
		          // parse through it and make a newUser object.
		          newUser.gender         = profile.gender;
		          newUser.github_id      = profile.id;
		          newUser.picture        = profile.photos[0].value;
		          newUser.username       = profile.displayName;

		          // save our user to the database
		          User.addFacebookUser(newUser, function(err, results) {
		            if (err) throw err;

		            // if successful, return the new user
		            return done(null, newUser);
		          });
		        }
		    });

		  });

		}));

};



