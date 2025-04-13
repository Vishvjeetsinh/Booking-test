/* eslint-disable no-process-exit */

'use strict';

//* * Packages */
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config({ path: `${__dirname}/.env` });

//* * Utils */
const ErrorResponse = require('./app/utils/errorResponse');
const errorHandler = require('./app/middleware/error');
const { customLogger } = require('./app/utils/Logger');
const { testDbConnection, sq } = require('./app/model/index');

const app = express();

const whiteList = [];
const corsOptions = {
  origin: process.env.NODE_ENV === 'dev' ? '*' : whiteList,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Access-Control-Allow-Headers',
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'authorization',
    'x-payload-digest',
    'x-payload-digest-alg',
  ],
};

// Enable CORS (Cross-Origin Resource Sharing) to allow requests from other origins
app.use(cors(corsOptions));

// Enhance security by setting HTTP headers with the 'helmet' middleware
app.use(helmet());

// Parse requests of content-type - application/json
app.use(
  bodyParser.json({
    verify: (req, res, buf, encoding) => {
      if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
      }
    },
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
  }),
);

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Express file-upload
app.use(fileUpload());

// Db connection
testDbConnection();

// Db sync
sq.sync({ alter: true })
  .then(() => {
    console.info('Synced db.');
  })
  .catch(err => {
    console.error(`Failed to sync db: ${err.message}`);
  });

// Serve static files from the "public" directory
app.use('/upload', express.static(`${__dirname}/app/upload`));

// Simple route
// eslint-disable-next-line consistent-return
app.get('/', (req, res, next) => {
  try {
    return res.json({
      status: 'success',
      code: 200,
      message: 'Welcome to Ghex-Money api.',
    });
  } catch (error) {
    next(error);
  }
});

// Route config
require('./app/config/RouteConfig')(app);

// Favicon request
app.get('/favicon.ico', (req, res) => res.status(204));

// Unwanted route 404
app.all('/*splat', (req, res, next) => {
  next(new ErrorResponse(`ENDPOINT NOT FOUND`, 404));
});

// Error handler middleware
app.use(errorHandler);

// Set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.info(`Server is running on port ${PORT}.`);
});

// Handle uncaught exceptions
process.on('uncaughtException', err => {
  customLogger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', err => {
  customLogger.error(`Unhandled Promise Rejection: ${err.message}`);
  process.exit(1);
});
