const passport = require('passport');
const passportJwt = require('passport-jwt');
const keys = require('../config/key'); 
const User = require('../models/userModel');

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await User.findOne(jwtPayload.sr);
      console.log(user);
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
const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    req.user = user; // Set the authenticated user in the request object
    next(); // Proceed to the next middleware/route handler
  })(req, res, next);
};
module.exports = {
  authenticateJWT,
};
