/* eslint-disable no-restricted-syntax */

'use strict';

/* eslint-disable camelcase */
const BookingModel = require('../model/Booking.Model');
const ErrorResponse = require('../utils/errorResponse');

async function checkBookingAvailability(date, bookingType, slot, startTime, endTime) {
  try {
    // Case 1: Check if there's a full day booking for this date
    const fullDayBooking = await BookingModel.findOne({
      where: {
        bookingDate: date,
        bookingType: 'full_day',
      },
    });

    if (fullDayBooking) {
      return false; // Date is fully booked
    }

    // Case 2: If trying to book a full day, check if there are any other bookings
    if (bookingType === 'full_day') {
      const existingBookings = await BookingModel.findOne({
        where: {
          bookingDate: date,
        },
      });

      return !existingBookings; // Available only if no bookings exist
    }

    // Case 3: If booking half day, check for conflicts
    if (bookingType === 'half_day') {
      // Check if the selected slot is already booked
      const conflictingHalfDay = await BookingModel.findOne({
        where: {
          bookingDate: date,
          bookingType: 'half_day',
          slot,
        },
      });

      if (conflictingHalfDay) {
        return false;
      }

      // Check for custom bookings that might overlap with the half day slot
      const customBookings = await BookingModel.findAll({
        where: {
          bookingDate: date,
          bookingType: 'custom',
        },
      });

      // Define half day time ranges
      const firstHalfRange = { start: '09:00', end: '12:00' };
      const secondHalfRange = { start: '13:00', end: '17:00' };

      const relevantRange = slot === 'first_half' ? firstHalfRange : secondHalfRange;

      // Check each custom booking for overlap
      for (const booking of customBookings) {
        if (booking.startTime <= relevantRange.end && booking.endTime >= relevantRange.start) {
          return false; // There's an overlap
        }
      }

      return true; // No conflicts found
    }

    // Case 4: For custom bookings
    if (bookingType === 'custom') {
      // Check half day bookings for conflicts
      const halfDayBookings = await BookingModel.findAll({
        where: {
          bookingDate: date,
          bookingType: 'half_day',
        },
      });

      // Define half day time ranges
      const firstHalfRange = { start: '09:00', end: '12:00' };
      const secondHalfRange = { start: '13:00', end: '17:00' };

      // Check for overlaps with half day bookings
      for (const booking of halfDayBookings) {
        const relevantRange = booking.slot === 'first_half' ? firstHalfRange : secondHalfRange;

        if (startTime <= relevantRange.end && endTime >= relevantRange.start) {
          return false; // There's an overlap
        }
      }

      // Check other custom bookings for time conflicts
      const customBookings = await BookingModel.findAll({
        where: {
          bookingDate: date,
          bookingType: 'custom',
        },
      });

      // Check each custom booking for overlap
      for (const booking of customBookings) {
        if (startTime <= booking.endTime && endTime >= booking.startTime) {
          return false; // There's an overlap
        }
      }

      return true; // No conflicts found
    }

    return true; // Default: available
  } catch (error) {
    console.error('Error checking booking availability:', error);
    throw error;
  }
}

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
    const isAvailable = await checkBookingAvailability(
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
    const newBooking = await BookingModel.create({
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
