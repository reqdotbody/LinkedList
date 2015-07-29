//Database (The number preceding this file acknowledges a timestamp from the last database update)

//Functionality for starting up all new database schema
exports.up = function(knex, Promise) {
  //Initialize Users Table
    var users = knex.schema.createTable('users', function(table) {
      table.increments('id').primary();
      table.string('name');
      console.log("Created Users Table");
    })

  //Initialize Prompts Table
    var prompts = knex.schema.createTable('prompts', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.text('description');
      console.log("Created Prompts Table");
    })

  //Initialize Frameworks Table
    var frameworks = knex.schema.createTable('frameworks', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.string('link');
      console.log("Created Frameworks Table");
    })

  //Initialize Projects Table
    var projects = knex.schema.createTable('projects', function(table){
      table.increments('id').primary();
      table.string('name');
      table.integer('owner_id').references('id').inTable('users');
      table.integer('helper_id').references('id').inTable('users');
      table.integer('prompt_id').references('id').inTable('prompts');
      table.integer('framework_id').references('id').inTable('frameworks');
      table.timestamp('created_at');
      console.log("Created Projects Table");
    })

    console.log("Finished setting up the database")
    return Promise.all([users, prompts, frameworks, projects]);

};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('users').
  dropTable('prompts').
  dropTable('frameworks').
  dropTable('projects')
};
