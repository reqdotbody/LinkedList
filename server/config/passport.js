var GithubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var User = require('../models/userModel.js');


module.exports = function(passport) {

	//if in heroku environment, use their variables, if not, use our own from auth.js file.
	var auth = process.env.DATABASE_URL ? null : require('./auth.js');
	var callbackURL = process.env.DATABASE_URL ? "http://lynkedlyst.herokuapp.com/auth/github/callback" : "http://localhost:3000/auth/github/callback";
	
  // Use the GitHubStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and GitHub
  //   profile), and invoke a callback with a user object.
  passport.use(new GithubStrategy({
  	clientID        : process.env.GITHUB_CLIENT_ID || auth.githubAuth.clientID,
	  clientSecret    : process.env.GITHUB_CLIENT_SECRET || auth.githubAuth.clientSecret,
	  callbackURL     : callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        var newUser = {};

        newUser.github_id          =   profile.id;               //integer
        newUser.github_username    =   profile.username;         //string 
        newUser.github_displayName =   profile.displayName;      //string
        newUser.github_img         =   profile._json.avatar_url; //string
        newUser.gihub_email        =   profile.emails[0].value;  //string
        newUser.github_location 	  =   profile._json.location;   //string
        newUser.github_url         =   profile._json.html_url;   //string

        return done(null, newUser);
      });
    }
  ));

	// used to serialize the user for the session
	// this happens when a user first visits the site and logs in via github
	passport.serializeUser(function(user, done){
		console.log("serializing");
		console.log('user in serialize user: ', user);

		User.findUserByGithubId(user.github_id, function(err, dbUser){

			//if user exists
			if(dbUser){
				done(null, dbUser.github_id);
				console.log("user has been added to session with", dbUser.github_id);
				console.log("user exists!");

			//user doesn't exist
			}else{

				//Add the user!
				console.log("user doesn't exist... add them!");
				User.addGithubUser(user, function(err, newUser){
					console.log("This is the newUser after addGithubuser succeds: ", newUser);
					if(err){
						return console.log(err);
					} else{
						//Add user to session with their github_id
						done(null, user);
					}
				});
			}

		})

	});

	// used to deserialize the user
	// this happens on every request so we know which user is logged in.
	passport.deserializeUser(function(userID, done){
		console.log("deserializing");
		console.log('deserialize user:', userID);
		User.findUserByGithubId(userID, function (error, dbUser) {
		  if(error){
		    done(error);
		  } else {
		    done(null, dbUser);
		  }
		});


	});

};


