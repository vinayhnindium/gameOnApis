/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import allRoutes from './router.js';

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(allRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`server is listening to port ${port} `); });
