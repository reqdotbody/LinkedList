
exports.up = function(knex, Promise) {
  var drop_project_name = knex.schema.table('projects', function(table){
    table.dropColumn('name');
    console.log("We dropped that project name!")
    })
    return Promise.all([drop_project_name]);
};

exports.down = function(knex, Promise) {
  
};
