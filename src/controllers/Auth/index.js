import passport from 'passport';

import { generateToken } from '../../middlewares/Auth/utils';
import { filterUserProfile } from '../User/utils';

const login = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({
        error: 'Not authenticated',
        profile: null
      });
    }

    return req.login(user, error => {
      if (error) {
        return next(error);
      }

      // remove unwanted/confidential properties like password
      const filteredUser = filterUserProfile(user);

      return res.json({
        status: 'success',
        data: {
          isAuth: true,
          user: filteredUser,
          jwt: generateToken(filteredUser)
        }
      });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  return res.json({
    status: 'success',
    data: {}
  });
};

export { login, logout };
