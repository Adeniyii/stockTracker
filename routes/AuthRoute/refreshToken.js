const router = require('express').Router();
const { refreshToken } = require('../../controllers/auth.controller');
const bodyValidator = require('../../middlewares/validationHandler');
const { refreshTokenValidation } = require('../../middlewares/authValidator');

router.post(
  '/refresh-token',
  refreshTokenValidation(),
  bodyValidator,
  refreshToken,
);

module.exports = router;
