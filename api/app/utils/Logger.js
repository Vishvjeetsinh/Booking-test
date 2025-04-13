'use strict';

// To store error log in file
const winston = require('winston');

const { combine, timestamp, printf, colorize } = winston.format;
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';

// Define the Winston logger configuration
// My custom format
// eslint-disable-next-line no-shadow
const myFormat = printf(({ level, message, timestamp, ...body }) => {
  let log = `${timestamp} [${level}] ${message} \n`;
  log += `Request:${JSON.stringify(body.request)}\n`;
  log += `Response:${JSON.stringify(body.response)}\n`;
  log += '-'.repeat(100);
  return log;
});

// Custom logger
const customLogger = winston.createLogger({
  level: 'info',
  format: combine(timestamp({ format: timestampFormat }), myFormat),
  transports: [
    new winston.transports.Console({
      silent: process.env.NODE_ENV !== 'dev',
      format: colorize({ all: true }),
    }), // Log to console with colors
    new winston.transports.File({ filename: 'winston.log' }),
  ],
});

module.exports = {
  customLogger,
};
