 module.exports = {

    githubAuth : {
      'clientID'      : "5f0e8d00560431802384", //your app ID
      'clientSecret'  : "f7faaeee7ac875fa650c7938077c645e46d85604", //your app Secret
      'callbackURL'   : 'http://127.0.0.1:3000/auth/github/callback'
    },

    //environment variables for heroku deployments when ready
    // pgData : {
    //   host: '',
    //   database: '',
    //   user : '',
    //   port : ,
    //   password : '',
    //   ssl: true
    // }
  }