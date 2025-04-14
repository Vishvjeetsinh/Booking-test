'use strict';

const router = require('express').Router();
const AuthController = require('../controller/AuthController');
const { rateLimitMiddleware } = require('../middleware/rateLimit');

module.exports = app => {
  router.post('/sign-up', rateLimitMiddleware, AuthController.signUp);
  router.post('/sign-in', rateLimitMiddleware, AuthController.signIn);
  router.get('/verify-email', rateLimitMiddleware, AuthController.verifyEmail);

  app.use('/api/auth', router);
};
