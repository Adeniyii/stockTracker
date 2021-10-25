const router = require('express').Router();
const auth = require('../../auth/auth');
const { verifyActivationCode } = require('../../controllers/user.controller');
const { verifyOtpValidation } = require('../../middlewares/userValidator');
const bodyValidator = require('../../middlewares/validationHandler');

router.post(
  '/:user_id/verify',
  auth,
  verifyOtpValidation(),
  bodyValidator,
  verifyActivationCode,
);

module.exports = router;
