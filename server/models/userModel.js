var express = require('express');
var router = express.Router();
var session = require('express-session');
var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);

// USERMODEL FILE. Contains utility functions for all the db user get/requests

exports.findUserByGithubId = function(github_name, callback){
  console.log("Inside the findUserByGithubId query");
  knex('users')
    .where('name', github_name)
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
      console.log("you suck - jk!")
      console.log(err);
    });
}

exports.addGithubUser = function(newUser, callback){
  console.log("Inside the addGithubUser query");
  //TODO -- when the DB is updated to include, image, insert it too.
  knex('users')
    .insert({
      name: newUser.github_name
    })
    .then(function(insertedUser){
      callback(null, insertedUser);
    })
    .catch(function(err){
      callback(err, null);
    })
}