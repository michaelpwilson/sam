/**
 * AuthController
 *
 * @module      :: Controller
 * @description	:: Provides the base authentication
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').waterlocked({
    go: function(req, res){

      var passport = require('passport');
  
      passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
      });

    }

});
