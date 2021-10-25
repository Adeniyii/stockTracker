const router = require('express').Router();
const auth = require('../../auth/auth');
const { activateUser } = require('../../controllers/user.controller');
const { userActivationValidation } = require('../../middlewares/userValidator');
const bodyValidator = require('../../middlewares/validationHandler');

router.put(
  '/:user_id/activate',
  auth,
  userActivationValidation(),
  bodyValidator,
  activateUser,
);

module.exports = router;
