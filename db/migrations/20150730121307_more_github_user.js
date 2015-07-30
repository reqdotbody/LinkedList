
exports.up = function(knex, Promise) {
  var user_update_two_github = knex.schema.table('users', function (table) {
    table.dropColumn('github_name');
    table.string('github_username');
    table.string('github_displayName');
    table.string('github_email');
    table.string('github_location');
    table.string('github_url');
    console.log("User Table Updated Yet Again... thanks Esteban");
  })
  return Promise.all([user_update_two_github]);
};

exports.down = function(knex, Promise) {
  
};
