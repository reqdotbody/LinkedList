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
			owner_id: req.user.github_id,
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
	knex.select('projects.id as project_id', 'owner_id', 'prompt_id', 'framework_id', 'created_at', 'duration', 'users.github_id', 'users.github_username', 
		'users.github_displayName', 'frameworks.name AS framework_name', 'prompts.name AS prompt_name', 'prompts.description')
		.from('projects')
		.join('users', function() {
			this
			.on('projects.owner_id', '=', 'users.id')
			.on('projects.helper_id', '=', 'users.id');
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
	knex.select('id', 'owner_id', 'helper_id', 'prompt_id', 'framework_id', 'created at', 'duration', 'users.github_id', 'users.github_username', 
		'users.github_displayName', 'frameworks.name AS framework_name', 'prompts.name AS prompt_name', 'prompts.description')
		.from('projects')
		.join('users', function() {
			this
			.on('users.id AS ownerId', '=', 'projects.owner_id')
			.on('users.id AS helperId', '=', 'projects.helper_id');
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
router.post('v1/submit/framework', function(req, res, next) {
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

//GET request to retrieve all the projects associated with a specific user
router.get('/v1/projects/user', function(req, res, next) {
		knex.select('id', 'owner_id', 'helper_id', 'prompt_id', 'framework_id', 'created_at', 'duration', 'users.github_id', 'users.github_username', 
			'users.github_displayName', 'frameworks.name AS framework_name', 'prompts.name AS prompt_name', 'prompts.description')
		.from('projects')
		.join('users', function() {
			this.on('users.id AS ownerId', '=', 'projects.owner_id')
			.orOn('users.id AS helperId', '=', 'projects.helper_id')
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

module.exports = router;



