import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import passport from './middlewares/Auth/passport';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(compression());

app.use(cors());

app.use(helmet());

// Auth with Passport
app.use(passport.initialize());

// import custom routes
app.use('/', routes);

app.listen(process.env.PORT, () => {
  /* eslint-disable no-console */
  console.log(`Server listening on port ${process.env.PORT}`);
});
