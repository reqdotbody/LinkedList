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
		console.log("in serialize");
		console.log(user);
		return done(null, user);
	});

	// used to deserialize the user
	// this happens on every request so we know which user is logged in.
	passport.deserializeUser(function(github_id, done){
		console.log("in deserialize")
		User.findUserByGithubId(github_id, function(err, user) {
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
	  callbackURL     : auth.githubAuth.callbackURL
	},

	// github will send back the token and profile
	function(accessToken, refreshToken, profile, done) {

	   // asynchronous verification, for effect...
	   process.nextTick(function () {

	  	// console.log("Github sent us an access token, refresh token, and profile");
	  	// console.log("access token:");
	  	// console.log(accessToken);
	  	// console.log("refresh token:");
	  	// console.log(refreshToken);
	  	// console.log("profile:");
	  	// console.log(profile);

	  	//Save the profile's username to search through the database with
	  	var github_id  = profile.id;
			
			User.findUserByGithubId(github_id, function(err, user){
				//if there's an error, stop everything and return that
				//i.e. an error connecting to the database
				if(err){
					console.log("error in passport.js");
					return done(err);
				}

				//if the user is found (already in the database), then log them in
				if(user){
					console.log(user);
					console.log("user is found, log them in");
					return done(null, user);
				}

				//if there is no user found with that name, 
				//then add them to the database, using the info returned from Github.
				else{
					console.log("user is not found, add them to the database");

					var newUser = {};

					newUser.gihub_id           =   profile.id;               //integer
					newUser.github_username    =   profile.username;         //string 
					newUser.github_displayName =   profile.displayName;      //string
					newUser.github_img         =   profile._json.avatar_url; //string
					newUser.gihub_email        =   profile.emails[0].value;  //string
					newUser.github_location 	 =   profile._json.location;   //string
					newUser.github_url         =   profile._json.html_url;   //string


					//save new user to the database
					User.addGithubUser(newUser, function(err, results){
						if(err) throw err;
						//if successful, return the new user
						return done(null, newUser);
					});

				}

			});
	  });
	}));
};



