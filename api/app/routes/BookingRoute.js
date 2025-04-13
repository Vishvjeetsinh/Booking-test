'use strict';

const router = require('express').Router();
const BookingController = require('../controller/BookingController');
const { verifyToken } = require('../middleware/authJWT');
const { rateLimitMiddleware } = require('../middleware/rateLimit');

module.exports = app => {
  router.post('/bookings', rateLimitMiddleware, verifyToken, BookingController.createBooking);

  app.use('/api', router);
};
