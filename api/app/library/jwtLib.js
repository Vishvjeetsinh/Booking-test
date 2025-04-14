'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  jwtSign(obj) {
    try {
      const jwtExpire = process.env.JWT_EXPIRE;
      const jwtSecret = process.env.JWT_AT_SECRET;

      return jwt.sign(obj, jwtSecret, {
        expiresIn: jwtExpire,
      });
    } catch (error) {
      throw error;
    }
  },
};
