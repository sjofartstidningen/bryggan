/* eslint-disable no-console */

const express = require('express');
const next = require('next');
const routeGenerator = require('./utils/route-generator');

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const server = express();
const app = next({ dev });
const handler = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    // server.get('page/:username', routeGenerator(app, '/page'));
    server.get('*', (req, res) => handler(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log(`📠  Server ready on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);

    process.exit(1);
  });
