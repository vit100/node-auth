const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('./controllers/users');
const helpers = require('./helpers/routeHelpers')

passport.use("myJWT", new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// .fromHeader("Authorization"),
  secretOrKey: process.env.JSONWEBTOKEN_SECRET
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      done(null, user);
    }
    done(null, false);
  } catch (error) {
    done(error, false);
  }
}));

passport.use("myLocalStrategy", new LocalStrategy({
  usernameField: "email",
  passwordField: "password",
}, async (email, password, done) => {
  try {
    var user = await User.findByEMailPassword(email, password);
    if (user) {
      done(null, user);
    }
    done(null, false);
  } catch (error) {
    done(error, false);
  }
}
));

module.exports = passport;
