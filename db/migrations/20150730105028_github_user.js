
exports.up = function(knex, Promise) {

  var user_update = knex.schema.table('users', function (table) {
    table.dropColumn('name');
    table.integer('github_id');
    table.string('github_name');
    table.string('github_img');
    console.log("User Table Updated for Github import");
  })

  var duration_add = knex.schema.table('projects', function(table){
    table.string('duration');
    console.log("Duration added to projects table");
  })

  return Promise.all([user_update, duration_add]);
};

exports.down = function(knex, Promise) {
  
};
