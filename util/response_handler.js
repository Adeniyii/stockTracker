exports.responseHandler = (
  res,
  message,
  statusCode = 501,
  success = false,
  data = {},
) => {
  res.status(statusCode).json({
    success,
    message,
    data: {
      message,
      data,
    },
  });
};
exports.successResponse = (res, statusCode = 200, data = {}) => {
  res.status(statusCode).json(data);
};
exports.errorResponse = (res, message, statusCode = 500, error = {}) => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};
