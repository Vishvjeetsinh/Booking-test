'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
  jwtSign(obj, tokenType) {
    try {
      const jwtExpire =
        tokenType === 'Access Token'
          ? process.env.JWT_EXPIRE
          : process.env.JWT_REFRESH_TOKEN_EXPIRE;
      const jwtSecret =
        tokenType === 'Access Token' ? process.env.JWT_AT_SECRET : process.env.JWT_RT_SECRET;

      return jwt.sign(obj, jwtSecret, {
        expiresIn: jwtExpire,
      });
    } catch (error) {
      throw error;
    }
  },
};
