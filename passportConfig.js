const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');
const UserModel = require('./models/user');


passport.use("myJWT", new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// .fromHeader("Authorization"),
  secretOrKey: process.env.JSONWEBTOKEN_SECRET
}, async (payload, done) => {
  try {
    const user = await UserModel.findById(payload.sub);
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
    var user = await UserModel.findOne({email});
    
    if (user && await user.isPasswordValid(password)) {
      done(null, user);
    }
    done(null, false);
  } catch (error) {
    done(error, false);
  }
}
));

module.exports = passport;
