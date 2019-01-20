const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy, ExtractJwt } = require('passport-jwt');
const {Strategy: GoogleStrategy} = require('passport-google-oauth2');
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

passport.use("googleStrategy", new GoogleStrategy(
  {
    clientID:process.env.GOOGLE_APP_ID,
    clientSecret:process.env.GOOGLE_APP_SECRET,
    callbackURL:`http://localhost:${process.env.PORT}/auth/google/cb`,
    scope:"openid"
  },
  (err, accessToken, refreshToken,profile,done)=>{
      if(err){}
  }));

module.exports = passport;
