/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import allRoutes from './router.js';

// import pool from './dbConfig.js';

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(session({
  secret: 'sessionsecretid',
  resave: true,
  saveUninitialized: true,
  maxAge: 36000000 * 24, // 24 hour (in milliseconds)
}));

app.use(allRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server is listening to port ${port} `); });
