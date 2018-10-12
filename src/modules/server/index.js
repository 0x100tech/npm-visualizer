const path = require('path');

const http = require('http');
const express = require('express');
const opener = require('opener');

const projectRoot = path.resolve(__dirname, '..');

/**
 * Starts visualizing server
 * @param {Object} options - contains server options (host, port and open in browser flag)
 */
async function start(options) {
  const {
    port = 3333,
    host = 'localhost',
    open = true,
  } = options || {};

  const app = express();

  app.use(express.static(`${projectRoot}/public`));

  const server = http.createServer(app);

  await new Promise((resolve) => {
    server.listen(port, host, () => {
      resolve();
      const url = `http://${host}:${server.address().port}`;

      if (open) {
        opener(url);
      }
    });
  });

  return {
    server,
  };
}

module.exports = {
  start,
};
