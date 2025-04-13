/* eslint-disable global-require */

'use strict';

module.exports = app => {
  require('../routes/AuthRoute')(app);
  require('../routes/BookingRoute')(app);
};
