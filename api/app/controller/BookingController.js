/* eslint-disable no-restricted-syntax */

'use strict';

/* eslint-disable camelcase */
const ErrorResponse = require('../utils/errorResponse');
const {
  checkBookingAvailabilityService,
  createBookingService,
} = require('../services/Booking.Service');

// Create a new booking with validation
const createBooking = async (req, res, next) => {
  try {
    const {
      customerName,
      customerEmail,
      bookingDate,
      bookingType,
      slot,
      startTime,
      endTime,
    } = req.body;

    // Format booking date as YYYY-MM-DD for storage
    const formattedDate = new Date(bookingDate).toISOString().split('T')[0];

    // Check for booking conflicts
    const isAvailable = await checkBookingAvailabilityService(
      formattedDate,
      bookingType,
      slot,
      startTime,
      endTime,
    );

    if (!isAvailable) {
      throw new ErrorResponse('This time slot is not available due to a booking conflict', 400);
    }

    // Create booking record
    const newBooking = await createBookingService({
      userId: req.iUserId,
      customerName,
      customerEmail,
      bookingDate: formattedDate,
      bookingType,
      slot: bookingType === 'half_day' ? slot : null,
      startTime: bookingType === 'custom' ? startTime : null,
      endTime: bookingType === 'custom' ? endTime : null,
    });

    res.status(201).json({
      success: true,
      booking: newBooking,
    });
  } catch (error) {
    next(new ErrorResponse('Failed to create booking', 500));
  }
};

module.exports = {
  createBooking,
};
