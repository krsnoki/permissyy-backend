const passport = require('passport');
const passportJwt = require('passport-jwt');
const keys = require('../config/key'); 
const User = require('../models/userModel');

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

opts.secretOrKey = keys.secretOrKey;
passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

const authenticateJWT = passport.authenticate('jwt', { session: false });

module.exports = {
  authenticateJWT,
};
