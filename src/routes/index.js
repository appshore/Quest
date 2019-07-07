import express from 'express';
import passport from 'passport';

import authRoutes from './auth';
import itemsRoutes from './items';

const routes = express.Router();

// only REST endpoints
routes.use(`/${process.env.API}/*`, (req, res, next) => {
  if (
    req.headers &&
    (req.headers.accept === 'application/json' ||
      req.headers['content-type'] === 'application/json')
  ) {
    next();
  } else {
    res.status(422).send({ status: 'error', message: 'Invalid API' });
  }
});

// auth routes
routes.use(`/${process.env.API}/auth`, authRoutes);

// items routes, required being authenticated
routes.use(
  `/${process.env.API}/items`,
  passport.authenticate('jwt', { session: false }),
  itemsRoutes
);

// ping
routes.use(`/${process.env.API}/ping`, (req, res) => {
  res.send({ status: 'success', message: 'Welcome to the API' });
});

// ping with authentication
routes.use(
  `/${process.env.API}/pingauth`,
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.send({ status: 'success', message: 'Welcome to the auth API' });
  }
);

// catch all for unknown endpoints
routes.all('/*', (req, res) => {
  res.status(422).send({ status: 'error', message: 'Invalid API' });
});

export default routes;
