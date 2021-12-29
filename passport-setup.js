const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
passport.serializeUser(function(user, done) {
  done(null, user);
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(new FacebookStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email']

},
function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    console.log(accessToken)
  return done(null, profile);
}
));