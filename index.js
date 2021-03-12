// config should be imported before importing any other file
// import config from './config/config.js';
import { server } from './config/express.js';

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
  // listen on port config.port
  server.listen(4000, () => {
    console.info(`server started on port 4000 dev`); // eslint-disable-line no-console
  });

export default server;
