'use strict';

const setRateLimit = require('express-rate-limit');

// Create a rate limiter
// const rateLimitMiddleware = setRateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 5, // limit each IP to 5 requests per windowMs
//   message: "Too many requests, please try again later.",
//   headers: true,
// });

// ? if you want to send custom message to user
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000, // 1 minutes || For 15 minutes  15 * 60 * 1000
  max: 5, // limit each IP to 100 requests per windowMs
  validate: { xForwardedForHeader: false },
  handler: (req, res) => {
    //    Customize the response when rate limit is exceeded
    res.status(429).json({
      success: false,
      statusCode: 429,
      message: 'Too many requests, please try again later.',
    });
  },
});

// Use the rate limiter as middleware
module.exports = {
  rateLimitMiddleware,
};
