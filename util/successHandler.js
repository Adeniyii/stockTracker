/**
 * Handle success responses.
 * @param res
 * @param {string} message success message
 * @param {int} statusCode success status code
 * @param {*} data DTO payload
 */
const successHandler = (res, statusCode = 200, data = {}) => {
  const status = 'success';
  res.status(statusCode).json({
    status,
    statusCode,
    data: {
      status,
      data,
    },
  });
};

module.exports = successHandler;
