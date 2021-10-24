/* eslint-disable no-param-reassign */
const logger = require('../util/logger');

const sendErrorDev = (err, req, res) => {
  // Log error
  logger.error(`[errorController.js] (line 4) - ${err.message}`);

  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  // Log error
  logger.error(`[errorController.js] (line 29) - ${err.message}`);

  // Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Send generic message
  return res.status(500).json({
    status: 'error',
    message: 'Something went very wrong!',
  });
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') sendErrorDev(err, req, res);
  //
  else if (process.env.NODE_ENV === 'production') {
    const error = { ...err };

    error.message = err.message;

    sendErrorProd(error, req, res);
  }
};
