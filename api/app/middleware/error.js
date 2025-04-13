/* eslint-disable consistent-return */

'use strict';

const { customLogger } = require('../utils/Logger');

const errorHandler = async (err, req, res, next) => {
  const error = { ...err };
  let errRes = {};

  error.messgae = err.message;

  // sequalize validation error
  if (err.name === 'SequelizeValidationError') {
    errRes = {
      status: 'fail',
      statusCode: error.statusCode || 400,
      message: err.errors.map(e => e.message),
    };

    customLogger.error({
      message: err.errors.map(e => e.message),
      request: {
        url: req.originalUrl,
        body: process.env.NODE_ENV === 'dev' ? req.body || '' : '',
      },
      response: errRes,
    });

    return res.status(400).json(errRes);
  }

  errRes = {
    status: 'error',
    statusCode: error.statusCode || 500,
    message: error.statusCode ? err.message : 'Internal Server Error',
  };

  customLogger.error({
    message: err.message,
    request: {
      url: req.originalUrl,
      body: process.env.NODE_ENV === 'dev' ? req.body || '' : '',
    },
    response: {
      status: 'error',
      statusCode: error.statusCode || 500,
      message: err.message || 'Internal Server Error',
    },
  });

  return res.status(error.statusCode || 500).json(errRes);
};

module.exports = errorHandler;
