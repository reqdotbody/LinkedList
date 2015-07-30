var express = require('express');
var router = express.Router();
var session = require('express-session');
var config = require('../knexfile.js');
var env = process.env.NODE_ENV || 'development';
var knex = require('knex')(config[env]);


//POST request to create a project
router.post('/v1/submit/project', function(req, res, next) {
	knex('projects')
		.insert({
			name: req.body.name,
			owner_id: req.session.ownerID,
			prompt_id: req.body.prompt_id,
			framework_id: req.body.framework_id
		})
		.then(function(inserts) {
			res.json(inserts)
		})
		.catch(function(err) {
			console.error(err);
			res.json(err)
		})
});

//GET request to retrieve all available projects
router.get('/v1/projects/all/current', function(req, res, next) {
	knex.select('id', 'name', 'owner_id', 'prompt_id', 'framework_id', 'created_at', 'users.name', 'frameworks.name', 'prompts.name', 'prompts.description')
		.from('projects')
		.join('users', function() {
			this
			.on('projects.owner_id', '=', 'users.user_id')
			.on('projects.helper_id', '=', 'NULL');
		})
		.join('prompts', 'projects.prompt_id', '=', 'prompts.id')
		.join('frameworks', 'projects.framework_id', '=', 'frameworks.id')
		.then(function(items) {
			res.json(items)
		})
		.catch(function(err) {
			console.error(err);
			res.json(err)
		})
});

//GET request to retrieve all completed projects
router.get('/v1/projects/all/completed', function(req, res, next) {
	knex.select('id', 'name', 'owner_id', 'helper_id', 'prompt_id', 'framework_id', 'users.name', 'frameworks.name', 'prompts.name', 'prompts.description')
		.from('projects')
		.join('users', function() {
			this
			.on('projects.owner_id', '=', 'users.user_id')
			.on('projects.helper_id', '=', 'users.user_id');
		})
		.join('prompts', 'projects.prompt_id', '=', 'prompts.id')
		.join('frameworks', 'projects.framework_id', '=', 'frameworks.id')
		.then(function(items) {
			res.json(items)
		})
		.catch(function(err) {
			console.error(err);
			res.json(err)
		})
})

//GET request to retrieve all available prompts
router.get('/v1/prompts', function(req, res, next) {
	knex.select('id', 'name', 'description')
		.from('prompts')
		.then(function(items) {
			res.json(items)
		})
		.catch(function(err) {
			console.error(err);
			res.json(err)
		})
})

//POST request to create a new prompt
router.post('/v1/submit/prompt', function(req, res, next) {
	knex('prompts')
		.insert({
			name: req.body.name,
			description: req.body.description
		})
		.then(function(inserts) {
			res.json(inserts)
		})
		.catch(function(err) {
			console.error(err);
			res.json(err)
		})
})

//GET request to retrieve all available frameworks
router.get('/v1/frameworks', function(req, res, next) {
	knex.select('id', 'name', 'link')
		.from('frameworks')
		.then(function(inserts) {
			res.json(inserts)
		})
		.catch(function(err) {
			console.error(err);
			res.json(err)
		})
})

//POST request to create a new framework
router.post('v1/submit/framework' function(req, res, next) {
	knex('frameworks')
		.insert({
			name: req.body.name,
			link: req.body.link
		})
		.then(function(inserts) {
			res.json(inserts)
		})
		.catch(function(err) {
			console.error(err)
			res.json(err)
		})
})

//GET request to remove projects that have been available for over 24 hours and have no helper assigned
router.get('/v1/projects/all/expired', function(req, res, next) {
	knex.select('*')
		.from('projects')
		.where(function() {
			this.where('created_at', '>', knex.defaultTo(knex.raw('now()')), 'interval 1 day')
			.andWhere('helper_id', '=', 'NULL')
		})
		.del()
		.then(function(items) {
			res.json(items)
		})
		.catch(function(err) {
			console.error(err);
			res.json(err)
		})
})

module.exports = router;



