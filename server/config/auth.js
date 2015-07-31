 module.exports = {

    githubAuth : {
      //ATTENTION -- these vars are hidden so they don't show up on github. 
      //you need to substitute them from the real values from the github application page
      
      'clientID'      : "5f0e8d00560431802384", //check your app's github
      'clientSecret'  : "2925ce96a4c9481e33aa5d8d5f90b49adedab362", //check your app's github
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