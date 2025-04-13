/* eslint-disable consistent-return */

'use strict';

const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

  if (!token) {
    return next(new ErrorResponse('No token provided!', 403));
  }

  jwt.verify(token, process.env.JWT_AT_SECRET, (err, decoded) => {
    if (err) {
      console.log('err: ', err);
      return next(new ErrorResponse('Unauthorized', 401));
    }
    req.iUserId = decoded.id;
    req.uuId = decoded.uuId;
    next();
  });
};

module.exports = {
  verifyToken,
};
