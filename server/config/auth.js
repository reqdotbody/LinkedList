 module.exports = {

    githubAuth : {
      'clientID'      : "bbe372bd6cccdf9a85d7", //your app ID
      'clientSecret'  : "6f53408d48b98a84ff49659c156290d6e5ca4037", //your app Secret
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