var GithubStrategy = require('passport-github').Strategy;
var passport = require('passport');
var User = require('../models/userModel.js');


module.exports = function(passport) {

	//if in heroku environment, use their variables, if not, use our own from auth.js file.
	var auth = process.env.DATABASE_URL ? null : require('./auth.js');
	var callbackURL ="http://localhost:3000/auth/github/callback"
	
  // Use the GitHubStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and GitHub
  //   profile), and invoke a callback with a user object.
  passport.use(new GithubStrategy({
  	clientID        : auth.githubAuth.clientID,
	  clientSecret    : auth.githubAuth.clientSecret,
	  callbackURL     : auth.githubAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {

        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.

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


// 	  User.findUserByGithubId(profile.id, function(err, user) {
// 	  	console.log("WHAT IS USER? HERE: ", user);
// 	     if (err) return done(err);
// 	     //if there is no user, then return false
// 	     if (user) return done(null,false);
// 	     //otherwise, create it in the db
// 	     else{
// 	     	 console.log("The returned user: ", user);
// 	       User.addGithubUser(newUser, function(err, results){
// 	 	   			if(err) return done(err);
// 	 	   			if(!results) return done(null, false, req.flash('loginMessage' , 'User not found.'));
// 	 	   			else{
// 		 	   			console.log("successful add to db", results);
// 		 	   			console.log("user:", user);
// 		 	   			return done(null, user);
// 	 	   			}
// 	 	   		});
// 	     }
// 	  });

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
					console.log("This is the newUser after addGihubuser succeds: ", newUser);
					if(err){
						return console.log(err);
					} else{
						//Add user to session with their github_id
						done(null, dbUser.github_id);
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



	// =========================================================================
	// GITHUB  ================================================================
	// =========================================================================
	// passport.use(new GithubStrategy({

	//   // pull in our app id and secret from either heroku or our auth.js file.
	//   clientID        : auth.githubAuth.clientID,
	//   clientSecret    : auth.githubAuth.clientSecret,
	//   callbackURL     : auth.githubAuth.callbackURL,
	//   passReqToCallback: true
	// },

	// github will send back the token and profile
	// function(req, accessToken, refreshToken, profile, done) {

	// 	 req.session.token = accessToken;
	// 	 req.session.cookie.expires = new Date(Date.now() + 8*60*60*1000);


	// 	 console.log('req.session:', req.session);
	// 	 console.log('req.session.token:', req.session.token);
	// 	 console.log('req.session.cookie:', req.session.cookie);
	// 	 console.log('req.isAuthenticated:', req.isAuthenticated());

	// 	 var newUser = {};

	// 	 newUser.github_id          =   profile.id;               //integer
	// 	 newUser.github_username    =   profile.username;         //string 
	// 	 newUser.github_displayName =   profile.displayName;      //string
	// 	 newUser.github_img         =   profile._json.avatar_url; //string
	// 	 newUser.gihub_email        =   profile.emails[0].value;  //string
	// 	 newUser.github_location 	  =   profile._json.location;   //string
	// 	 newUser.github_url         =   profile._json.html_url;   //string
		
	// //	 process.nextTick(function () {
	// 		console.log('profile:', profile);

	// 	  User.findUserByGithubId(profile.id, function(err, user) {
	// 	  	console.log("WHAT IS USER? HERE: ", user);
	// 	     if (err) return done(err);
	// 	     //if there is no user, then return false
	// 	     if (user) return done(null,false);
	// 	     //otherwise, create it in the db
	// 	     else{
	// 	     	 console.log("The returned user: ", user);
	// 	       User.addGithubUser(newUser, function(err, results){
	// 	 	   			if(err) return done(err);
	// 	 	   			if(!results) return done(null, false, req.flash('loginMessage' , 'User not found.'));
	// 	 	   			else{
	// 		 	   			console.log("successful add to db", results);
	// 		 	   			console.log("user:", user);
	// 		 	   			return done(null, user);
	// 	 	   			}
	// 	 	   		});
	// 	     }
	// 	  });
		// });

	//}));
