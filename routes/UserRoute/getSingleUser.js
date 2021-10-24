const router = require('express').Router();
const auth = require('../../auth/auth');
const bodyValidator = require('../../middlewares/validationHandler');
const { getSingleUser } = require('../../controllers/user.controller');
const { userIdValidation } = require('../../middlewares/userValidator');

router.get('/:user_id', auth, userIdValidation(), bodyValidator, getSingleUser);

module.exports = router;
