const passport = require("passport")
const GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID:     process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://335projectfinal-env.eba-uett7bq6.us-east-1.elasticbeanstalk.com/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    //Can crete db entry
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
    return done(null, accessToken);

  }
));

passport.serializeUser(function(user, done){
    done(null, user)
})

passport.deserializeUser(function(user, done){
    done(null, user)
})

