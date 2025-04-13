'use strict';

const { Sequelize } = require('sequelize');
const { sq } = require('./index');

const User = sq.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: 'last_name',
    },
    email: {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  },
);

User.associate = models => {
  User.hasMany(models.Booking, {
    foreignKey: 'user_id',
    as: 'bookings',
  });
};

module.exports = User;
