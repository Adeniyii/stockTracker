const jwt = require('jsonwebtoken');
const AppError = require('../util/appError');

const { ACCESS_TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers.authorization.split(' ')[1];

  if (!token) {
    return next(
      new AppError('Access token is required for authentication', 403),
    );
  }
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
  return next();
};

module.exports = verifyToken;
