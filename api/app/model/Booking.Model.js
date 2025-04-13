'use strict';

const { Sequelize } = require('sequelize');
const { sq } = require('./index');

const Booking = sq.define(
  'Booking',
  {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.BIGINT,
      allowNull: false,
      field: 'user_id',
    },
    customerName: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'customer_name',
    },
    customerEmail: {
      type: Sequelize.STRING(100),
      allowNull: false,
      field: 'customer_email',
      validate: {
        isEmail: true,
      },
    },
    bookingDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      field: 'booking_date',
    },
    bookingType: {
      type: Sequelize.ENUM('full_day', 'half_day', 'custom'),
      allowNull: false,
      field: 'booking_type',
    },
    slot: {
      type: Sequelize.ENUM('first_half', 'second_half'),
      field: 'slot',
    },
    startTime: {
      type: Sequelize.TIME,
      field: 'start_time',
    },
    endTime: {
      type: Sequelize.TIME,
      field: 'end_time',
    },
  },
  {
    tableName: 'bookings',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['booking_date'],
      },
      {
        fields: ['booking_type'],
      },
      {
        fields: ['start_time', 'end_time'],
      },
      {
        fields: ['user_id', 'booking_date'],
      },
    ],
  },
);

Booking.associate = models => {
  Booking.hasMany(models.User, {
    foreignKey: 'id',
    as: 'bookings',
  });
};

module.exports = Booking;
