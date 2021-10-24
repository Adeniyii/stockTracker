const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { updateSingleUser } = require('../../controllers/user.controller');
const { userUpdateValidation } = require('../../middlewares/userValidator');

router.put(
  '/:user_id',
  auth,
  userUpdateValidation(),
  bodyValidator,
  updateSingleUser,
);

module.exports = router;
