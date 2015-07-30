var express = require('express');
var router = express.Router();
var session = require('express-session');
var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

// USERMODEL FILE. Contains utility functions for all the db user get/requests

exports.findUserByGithubId = function(github_id, callback){
  console.log("Inside the findUserByGithubId query");
  console.log(github_id);
  console.log("^github_id");
  knex('users')
    .where('github_id', github_id)
    .select('github_id')
    .then(function(items){
      console.log("You did it.")
      console.log(items);
      //if the user exists, send it back
      if(items.length > 0){
        console.log("oh ya bebe");
        callback(null, items);
      } 
      callback(null);
      //otherwise send nothing
    })
    .catch(function(err){
      console.log("you got an error in findUserByGithubId")
      console.log(err);
    });
}

exports.addGithubUser = function(newUser, callback){
  console.log("Inside the addGithubUser query");
  knex('users') 
    .insert({
      github_id          : newUser.github_id,
      github_username    : newUser.github_username,
      github_displayName : newUser.github_displayName,
      github_img         : newUser.github_img,
      github_email       : newUser.gihub_email,
      github_location    : newUser.github_location,
      github_url         : newUser.github_url
    })
    .then(function(insertedUser){
      callback(null, insertedUser);
    })
    .catch(function(err){
      callback(err, null);
    })
    
}