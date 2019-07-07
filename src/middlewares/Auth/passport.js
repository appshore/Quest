import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { filterUserProfile } from '../../controllers/User/utils';
import { User } from '../../services/database';

import { validPassword } from './utils';

// Set local strategy
const localStrategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    // find the corresponding user by username
    try {
      const user = await User.find({
        username
      }).value();

      if (!user) {
        return done(null, false, {
          status: 'error',
          message: 'User unknown'
        });
      }

      if (!validPassword(password, user.password)) {
        return done(null, false, {
          status: 'error',
          message: 'Password error'
        });
      }

      if (user.verified === false) {
        return done(null, false, {
          status: 'error',
          message: 'User not verified'
        });
      }

      return done(null, filterUserProfile(user));
    } catch (err) {
      return done(err, false, {
        status: 'error',
        message: `DB error: ${err}`
      });
    }
  }
);


// Set JWT strategy
const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromExtractors([
      ExtractJwt.fromAuthHeaderAsBearerToken()
    ]),
    secretOrKey: process.env.SECRET
  },
  async (payload, done) => {
    // find the corresponding user by username
    try {
      const user = await User.find({
        username: payload.username
      }).value();

      if (!user) {
        return done(null, false, {
          status: 'error',
          message: 'User unknown'
        });
      }

      return done(null, filterUserProfile(user));
    } catch (err) {
      return done(err, false, {
        status: 'error',
        message: `DB error: ${err}`
      });
    }
  }
);

passport.use('jwt', jwtStrategy);
passport.use('local', localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  try {
    const user = await User.find({
      username
    }).value();

    if (!user) {
      return done(null, false, {
        status: 'error',
        message: 'User unknown'
      });
    }

    return done(null, filterUserProfile(user));
  } catch (err) {
    return done(err, false, {
      status: 'error',
      message: `DB error: ${err}`
    });
  }
});

export default passport;
